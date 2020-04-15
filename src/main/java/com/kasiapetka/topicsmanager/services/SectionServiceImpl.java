package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Primary
public class SectionServiceImpl implements SectionService {
    private StudentRepository studentRepository;
    private SectionRepository sectionRepository;

    @Autowired
    public SectionServiceImpl(StudentRepository studentRepository, SectionRepository sectionRepository) {
        this.studentRepository = studentRepository;
        this.sectionRepository = sectionRepository;
    }

    @Override
    @Transactional
    public Boolean addStudentToSection(Student student, Section section) {
        try {
            student = studentRepository.save(student);
            section = sectionRepository.save(section);

            if(section.getState() == 'O')
            if (student.getStudentSections() == null) {
                student.setStudentSections(new ArrayList<>());
            }

            StudentSection studentSectionToAdd = new StudentSection();
            studentSectionToAdd.setStudent(student);
            studentSectionToAdd.setSection(section);

            student.getStudentSections().add(studentSectionToAdd);

            studentRepository.save(student);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean addNewSection(Section section, Semester semester, Topic topic) {
        try {
            section.setSemester(semester);
            section.setTopic(topic);
            sectionRepository.save(section);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean deledeSection(Section section) {
        try {
            sectionRepository.delete(section);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean removeStudentFromSection(Student student, Section section) {
        try {
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean setTopicForSection(Topic topic, Section section) {
        try {

            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean importStudents(ArrayList<Student> students) {
        return null;
    }
}
