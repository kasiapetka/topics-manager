package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.NewTopicDTO;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.repositories.TopicRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import com.kasiapetka.topicsmanager.services.TopicService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {
    private TopicRepository topicRepository;
    private SubjectService subjectService;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, SubjectService subjectService){
        this.subjectService = subjectService;
        this.topicRepository = topicRepository;

    }

    @Override
    public Topic findTopicById(Long id) {
        return topicRepository.findById(id).orElse(new Topic());
    }

    @Override
    public Integer addNewTopic(NewTopicDTO newTopicDTO) {
        List<Topic> topicList = new ArrayList<>();
        try {
            topicList = subjectService.getTopicListBySubjectId(newTopicDTO.getSubjectID());
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
        for(Topic topic : topicList){
            if(topic.getName().equals(newTopicDTO.getName())){
                //topic exists
                return 409;
            }
        }

        Topic topic = new Topic();
        topic.setName(newTopicDTO.getName());
        topic.setSummary(newTopicDTO.getSummary());

        try {
            topic.setSubject(subjectService.findSubjectById(newTopicDTO.getSubjectID()));
            topicRepository.save(topic);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
    }
}
