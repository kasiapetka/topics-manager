package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.AdminService;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Primary
public class AdminServiceImpl implements AdminService {

    protected UserRepository userRepository;
    protected TeacherRepository teacherRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected StudentRepository studentRepository;


    public AdminServiceImpl(UserRepository userRepository, TeacherRepository teacherRepository,
                            BCryptPasswordEncoder bCryptPasswordEncode,
                            StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentRepository =studentRepository;
    }

    @Override
    public List<Student> listStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().iterator().forEachRemaining(students::add);

        return students;
    }
}