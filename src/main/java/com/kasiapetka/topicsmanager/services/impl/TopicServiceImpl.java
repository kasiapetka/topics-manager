package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.NewTopicDTO;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.TopicRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.TopicService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class TopicServiceImpl implements TopicService {
    private TopicRepository topicRepository;
    private SubjectService subjectService;
    private TeacherService teacherService;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, SubjectService subjectService,
                            TeacherService teacherService){
        this.subjectService = subjectService;
        this.topicRepository = topicRepository;
        this.teacherService = teacherService;

    }

    @Override
    public Topic findTopicById(Long id) {
        return topicRepository.findById(id).orElse(new Topic());
    }

    @Override
    public Integer addNewTopic(NewTopicDTO newTopicDTO) {
        List<Topic> topicList = new ArrayList<>();
        try {
            topicList = subjectService.getTopicListBySubjectId(newTopicDTO.getSubject());
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
            topic.setSubject(subjectService.findSubjectById(newTopicDTO.getSubject()));
            topicRepository.save(topic);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
    }

    @Override
    public List<Topic> getTopicListByTeacherID(Long teacherID, Long subjectID) {
        Teacher teacher = teacherService.findTeacherById(teacherID);
        List<Topic> teachersTopics = teacher.getTopics();

        Subject subject = subjectService.findSubjectById(subjectID);
        List<Topic> subjectsTopics = subject.getTopics();

        teachersTopics.retainAll(subjectsTopics);

        return teachersTopics;
    }

    @Override
    public List<Topic> getTopicsListBySubjectID(Long subjectID) {
        Subject subject = subjectService.findSubjectById(subjectID);
        return subject.getTopics();
    }
}
