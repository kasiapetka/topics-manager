package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.repositories.AdminRepository;
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


    public AdminServiceImpl(UserRepository userRepository, AdminRepository adminRepository,
                            TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<Teacher> listTeachers() {
        List<Teacher> teachers = new ArrayList<>();
        teacherRepository.findAll().iterator().forEachRemaining(teachers::add);

        return teachers;
    }

    //    @Override
//    public void changePassword(User admin, String password) {
//        admin.setPassword(bCryptPasswordEncoder.encode(password));
//        adminRepository.save(admin);
//    }
}