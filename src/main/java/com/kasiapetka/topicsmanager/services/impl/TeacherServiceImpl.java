package com.kasiapetka.topicsmanager.services.impl;


import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.RoleService;
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
    protected RoleService roleService;


    public TeacherServiceImpl(TeacherRepository teacherRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository,
                              StudentRepository studentRepository, RoleService roleService) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
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

    @Override
    public Boolean addNewTeacher(NewStudentOrTeacherDTO studentOrTeacherDTO) {

        try {
            User user = new User();
            user.setEmail(studentOrTeacherDTO.getEmail());
            user.setPassword(studentOrTeacherDTO.getPassword());
            user.setRole(roleService.findRoleByRoleName("Teacher"));

            Teacher teacher = new Teacher();
            teacher.setName(studentOrTeacherDTO.getName());
            teacher.setSurname(studentOrTeacherDTO.getSurname());
            teacher.setIsActive(true);
            teacher.setUser(user);

            teacherRepository.save(teacher);
            return true;
        } catch (HibernateException he) {
            he.printStackTrace();
            return false;
        }
    }
}
