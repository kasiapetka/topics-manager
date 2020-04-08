package com.kasiapetka.topicsmanager.services;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Primary
public class TeacherServiceImpl implements TeacherService{

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

//    @Override
//    public void changePassword(Teacher teacher, String password) {
//        teacher.getUser().setPassword(bCryptPasswordEncoder.encode(password));
//        teacherRepository.save(teacher);
//    }

    @Override
    public Teacher findTeacherByUser(User user) {
        return teacherRepository.findByUser(user);
    }

    @Override
    public List<Student> listStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().iterator().forEachRemaining(students::add);
        return students;
    }
}
