package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.repositories.AdminRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Primary
public class AdminServiceImpl implements AdminService{

    protected UserRepository userRepository;
    protected AdminRepository adminRepository;
    protected TeacherRepository teacherRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected StudentRepository studentRepository;


    public AdminServiceImpl(UserRepository userRepository, AdminRepository adminRepository,
                            TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncode,
                            StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentRepository =studentRepository;
    }

    @Override
    public List<Teacher> listTeachers() {
        List<Teacher> teachers = new ArrayList<>();
        teacherRepository.findAll().iterator().forEachRemaining(teachers::add);

        return teachers;
    }

    @Override
    public List<Student> listStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().iterator().forEachRemaining(students::add);

        return students;
    }
//    @Override
//    public void changePassword(User admin, String password) {
//        admin.setPassword(bCryptPasswordEncoder.encode(password));
//        adminRepository.save(admin);
//    }
}