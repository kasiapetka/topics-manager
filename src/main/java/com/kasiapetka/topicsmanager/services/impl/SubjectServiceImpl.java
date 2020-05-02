package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.AddSubjectDTO;
import com.kasiapetka.topicsmanager.DTO.TeacherDTO;
import com.kasiapetka.topicsmanager.DTO.TeacherListDTO;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.services.SubjectService;
import com.kasiapetka.topicsmanager.services.TeacherService;
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
    private TeacherService teacherService;

    public SubjectServiceImpl(SubjectRepository subjectRepository, TeacherService teacherService) {
        this.subjectRepository = subjectRepository;
        this.teacherService = teacherService;
    }

    @Override
    // for database loader probably to delete later
    public Boolean addNewSubject(Subject subject) {
        try {
            subjectRepository.save(subject);
            return true;
        } catch (HibernateException he) {
            return false;
        }
    }

    @Override
    public Integer addNewSubject(AddSubjectDTO addSubjectDTO) {
        List<Subject> subjectList = new ArrayList<>();
        try {
            subjectList = this.getSubjectsList();
        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }
        for (Subject subject1 : subjectList) {
            if (subject1.getName().equals(addSubjectDTO.getName())) {
                return 409;
            }
        }


        Subject subject = new Subject();
        subject.setName(addSubjectDTO.getName());
        subject.setSummary(addSubjectDTO.getSummary());

        try {
            subjectRepository.save(subject);
            return 200;
        } catch (HibernateException he) {
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
        Optional<Subject> subjectOptional = subjectRepository.findById(id);
        if (!subjectOptional.isPresent()) {
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
    public Integer editSubjectsTeachers(TeacherListDTO teacherListDTO, Long subjectID) {

        List<Teacher> teachers = new ArrayList<>();

        for(TeacherDTO teacherDTO : teacherListDTO.getTeachers()){
            Teacher teacher = teacherService.findTeacherById(teacherDTO.getId());
            teachers.add(teacher);
        }

        System.out.println(teachers);

        Subject subject;
        try {
            subject = this.findSubjectById(subjectID);
        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }

        if (subject.getName().isEmpty()) {
            //Subject with given id does not exist
            return 409;
        }

        List<Subject> subjectList = new ArrayList<>();
        subjectList.add(subject);

        try {
            subject.setTeachers(teachers);
            subjectRepository.save(subject);

            for(Teacher t : teachers){
                t.setSubjects(subjectList);
            }

        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }
        return 200;
    }

    @Override
    public List<Teacher> getTeachersBySubjectId(Long id) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject == null) {
            return new ArrayList<>();
        }
        return subject.getTeachers();
    }

    @Override
    public List<Subject> getSubjectListByTeacherID(Long id) {
        Teacher teacher = teacherService.findTeacherById(id);
        System.out.println(teacher);
        List<Subject> teachersSubjects = teacher.getSubjects();
        System.out.println(teachersSubjects);
        return teachersSubjects;
    }
}
