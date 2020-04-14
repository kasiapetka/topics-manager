package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Primary
public class IndexServiceImpl implements IndexService {

    protected UserRepository userRepository;
    protected RoleRepository roleRepository;
    protected StudentRepository studentRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public IndexServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                            BCryptPasswordEncoder bCryptPasswordEncoder, StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void create(User user, Student student) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setIsActive(true);
        Role userRole = roleRepository.findByRoleName("Student");
        user.setRole(userRole);
        userRepository.save(user);
        student.setUser(user);
        studentRepository.save(student);
    }
}

