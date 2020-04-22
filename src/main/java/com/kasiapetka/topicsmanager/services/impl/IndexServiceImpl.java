package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.DTO.RegisterForm;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.IndexService;
import com.kasiapetka.topicsmanager.services.RoleService;
import com.kasiapetka.topicsmanager.services.UserService;
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

    protected RoleService roleService;
    protected UserService userService;

    protected BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public IndexServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                            BCryptPasswordEncoder bCryptPasswordEncoder, StudentRepository studentRepository,
                            RoleService roleService, UserService userService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;

        this.roleService = roleService;
        this.userService = userService;

        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User findUserByEmail(String email) {
        return userService.findUserByEmail(email);
    }

    @Override
    public void create(User user, Student student) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Role userRole = roleService.findRoleByRoleName("Student");
        user.setRole(userRole);
        userRepository.save(user);
        student.setUser(user);
        studentRepository.save(student);
    }

    @Override
    public int createStudent(RegisterForm newStudent) {
//        User userExists = findUserByEmail(newStudent.getNewEmail());
//        Long album = Long.parseLong(newStudent.getAlbum());
//
        return 0;
    }
}

