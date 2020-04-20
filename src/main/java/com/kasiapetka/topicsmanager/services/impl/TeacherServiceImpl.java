package com.kasiapetka.topicsmanager.services.impl;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.TeacherService;
import org.hibernate.HibernateException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Primary
public class TeacherServiceImpl implements TeacherService {

    protected TeacherRepository teacherRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;
    protected StudentRepository studentRepository;


    public TeacherServiceImpl(TeacherRepository teacherRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder,UserRepository userRepository,
                              StudentRepository studentRepository) {
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
        this.userRepository=userRepository;
        this.teacherRepository=teacherRepository;
        this.studentRepository =studentRepository;
    }

    @Override
    public Teacher findTeacherById(Long id) {
        Optional<Teacher> teacherOptional =  teacherRepository.findById(id);
        if(!teacherOptional.isPresent()){
            return null;
        }
        return teacherOptional.get();
    }

    @Override
    public Teacher findTeacherByUser(User user) {
        return teacherRepository.findByUser(user).orElse(null);
    }

    @Override
    public List<Student> listStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAllByIsActive(true).orElse(null).iterator().forEachRemaining(students::add);
        return students;
    }

    @Override
    public void changeName(Teacher teacher, String name) {
        teacher.setName(name);
        teacherRepository.save(teacher);
    }

    @Override
    public void changeSurname(Teacher teacher, String surname) {
        teacher.setSurname(surname);
        teacherRepository.save(teacher);
    }

    @Override
    public Boolean deleteTeacher(Long id) {
        try {
            Teacher teacher = findTeacherById(id);
            teacher.setIsActive(false);
            teacherRepository.save(teacher);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    public List<Teacher> listActiveTeachers() {
        List<Teacher> teachers = new ArrayList<>();
        teacherRepository.findAllByIsActive(true).orElse(null).iterator().forEachRemaining(teachers::add);
        return teachers;
    }
}
