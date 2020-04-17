package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.services.SectionService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class SectionServiceImpl implements SectionService {
    private SectionRepository sectionRepository;
    private StudentRepository studentRepository;

    @Autowired
    public SectionServiceImpl(SectionRepository sectionRepository, StudentRepository studentRepository){
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;
    }


    @Override
    public Boolean addNewSection(Topic topic, Semester semester, Section section) {
        try{
            section.setTopic(topic);
            section.setSemester(semester);
            sectionRepository.save(section);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean addStudentToSection(Student student, Section section) {
        if(!section.getIsOpen()){
            return false;
        }
        try{
            student = studentRepository.findByName(student.getName());
            section = sectionRepository.findByName(section.getName());

            StudentSection studentSection = new StudentSection();
            studentSection.setStudent(student);
            studentSection.setSection(section);

            section.addStudentSection(studentSection);

            sectionRepository.save(section);
            return true;
        } catch (HibernateException he){
            he.printStackTrace();
            return false;
        }
    }
}
