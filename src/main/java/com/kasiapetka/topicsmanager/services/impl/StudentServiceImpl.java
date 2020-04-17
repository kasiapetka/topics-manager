package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.StudentService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Primary
public class StudentServiceImpl implements StudentService {

    protected StudentRepository studentRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository,
                            BCryptPasswordEncoder bCryptPasswordEncoder,UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public Student findStudentByAlbum(Long album) {
        Optional<Student> studentOptional =  studentRepository.findById(album);
        if(!studentOptional.isPresent()){
           return null;
        }
        return studentOptional.get();
    }

    @Override
    public Student findStudentByUser(User user) {
        return studentRepository.findByUser(user);
    }

    @Override
    public void changeName(Student student, String name) {
        student.setName(name);
        studentRepository.save(student);
    }

    @Override
    public void changeSurname(Student student, String surname) {
        student.setSurname(surname);
        studentRepository.save(student);
    }

    @Override
    public Boolean deleteStudent(Long album) {
        try {
            Student student = findStudentByAlbum(album);
            student.setIsActive(false);
            studentRepository.save(student);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }
}
