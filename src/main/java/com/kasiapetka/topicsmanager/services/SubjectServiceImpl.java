package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.TopicRepository;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Primary
public class SubjectServiceImpl implements SubjectService {
    private TeacherRepository teacherRepository;
    private SubjectRepository subjectRepository;
    private TopicRepository topicRepository;


    @Autowired
    public SubjectServiceImpl(TeacherRepository teacherRepository, SubjectRepository subjectRepository,
                              TopicRepository topicRepository){
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public Boolean createSubject(Subject subject) {
        try {
            subjectRepository.save(subject);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean addTeacherToSubject(Teacher teacher, Subject subject) {
        try {
            teacher = teacherRepository.save(teacher);
            subject = subjectRepository.save(subject);
            subject.addTeacher(teacher);
            subjectRepository.save(subject);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    public Boolean addTopicToSubject(Topic topic, Subject subject) {
        try {
            topic.setSubject(subject);
            topicRepository.save(topic);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }
}
