package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import org.hibernate.HibernateException;

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
}
