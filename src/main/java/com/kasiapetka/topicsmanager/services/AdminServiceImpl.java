package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.repositories.AdminRepository;
import com.kasiapetka.topicsmanager.repositories.SubjectRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.hibernate.HibernateException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Primary
public class AdminServiceImpl implements AdminService{

    protected UserRepository userRepository;
    protected AdminRepository adminRepository;
    protected TeacherRepository teacherRepository;
    protected SubjectRepository subjectRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;


    public AdminServiceImpl(UserRepository userRepository, AdminRepository adminRepository,
                            TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                            SubjectRepository subjectRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Teacher> listTeachers() {
        List<Teacher> teachers = new ArrayList<>();
        teacherRepository.findAll().iterator().forEachRemaining(teachers::add);

        return teachers;
    }


    @Override
    public List<Student> listStudents(Integer semester) {
        return null;
    }
//    @Override
//    public void changePassword(User admin, String password) {
//        admin.setPassword(bCryptPasswordEncoder.encode(password));
//        adminRepository.save(admin);
//    }
}