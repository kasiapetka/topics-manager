package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.AddSubjectDTO;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class SubjectServiceImpl implements SubjectService {
    private SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }

    @Override
    // for database loader probably to delete later
    public Boolean addNewSubject(Subject subject) {
        try{
            subjectRepository.save(subject);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    public Integer addNewSubject(AddSubjectDTO addSubjectDTO) {
        List<Subject> subjectList = new ArrayList<>();
        try{
            subjectList = this.getSubjectsList();
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
        for(Subject subject1 : subjectList){
            if(subject1.getName().equals(addSubjectDTO.getName())){
                return 409;
            }
        }


        Subject subject = new Subject();
        subject.setName(addSubjectDTO.getName());
        subject.setSummary(addSubjectDTO.getSummary());

        try{
            subjectRepository.save(subject);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
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

    @Override
    public Subject findSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(new Subject());
    }

    @Override
    public Subject findSubjectByName(String name) {
        return subjectRepository.findByName(name).orElse(new Subject());
    }

    @Override
    public Integer editSubjectsTeachers(List<Teacher> teacherList, Long subjectID) {

        Subject subject = new Subject();
        try {
            subject = this.findSubjectById(subjectID);
        }   catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }

        if(subject.getName().isEmpty()){
            //Subject with given id does not exist
            return 409;
        }

        try {
            subject.setTeachers(teacherList);
        }   catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }

        return 200;
    }
}
