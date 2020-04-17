package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.repositories.TopicRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {
    private SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Boolean addNewSubject(Subject subject) {
        try{
            subjectRepository.save(subject);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    public List<Subject> getSubjectsList() {
        List<Subject> subjects = new ArrayList<>();
        subjectRepository.findAll().iterator().forEachRemaining(subjects::add);
        return subjects;
    }

    @Override
    @Transactional
    public List<Topic> getTopicListBySubjectId(Long id) {
        Optional<Subject> subjectOptional =  subjectRepository.findById(id);
        if(!subjectOptional.isPresent()){
            return null;
        }
        return subjectOptional.get().getTopics();
    }
}
