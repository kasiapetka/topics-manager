package com.kasiapetka.topicsmanager.services.impl;


import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.services.RoleService;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.UserService;
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
    protected UserService userService;
    protected StudentRepository studentRepository;
    protected RoleService roleService;


    public TeacherServiceImpl(TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                              UserService userService, StudentRepository studentRepository, RoleService roleService) {
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
        this.studentRepository = studentRepository;
        this.roleService = roleService;
    }

    @Override
    public Teacher findTeacherById(Long id) {
        Optional<Teacher> teacherOptional = teacherRepository.findById(id);
        if (!teacherOptional.isPresent()) {
            return null;
        }
        return teacherOptional.get();
    }

    @Override
    public Teacher findTeacherByUser(User user) {
        return teacherRepository.findByUser(user).orElse(null);
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
        } catch (HibernateException he) {
            return false;
        }
    }

    @Override
    public List<Teacher> listActiveTeachers() {
        List<Teacher> teachers = new ArrayList<>();
        teacherRepository.findAllByIsActive(true).orElse(new ArrayList<>()).iterator().forEachRemaining(teachers::add);
        return teachers;
    }

//    @Override
//    public List<Teacher> listActiveTeachers(Long subjectId) {
//        List<Teacher> teachers = new ArrayList<>();
//        teacherRepository.findAllByIsActive(true).orElse(new ArrayList<>()).iterator().forEachRemaining(teachers::add);
//        return teachers;
//    }

    @Override
    public Integer addNewTeacher(NewStudentOrTeacherDTO studentOrTeacherDTO) {

        User user = userService.findUserByEmail(studentOrTeacherDTO.getNewEmail());

        if (user != null) {
            // mail exists
            return 409;
        }

        user = new User();
        user.setEmail(studentOrTeacherDTO.getNewEmail());
        user.setPassword(bCryptPasswordEncoder.encode(studentOrTeacherDTO.getNewPassword()));
        user.setRole(roleService.findRoleByRoleName("Teacher"));

        Teacher teacher = new Teacher();
        teacher.setName(studentOrTeacherDTO.getNewName());
        teacher.setSurname(studentOrTeacherDTO.getNewSurname());
        teacher.setIsActive(true);
        teacher.setUser(user);

        try {
            teacherRepository.save(teacher);
            //everything is fine
            return 200;
        } catch (HibernateException he) {
            he.printStackTrace();
            // sth went wrong
            return 500;
        }
    }
}
