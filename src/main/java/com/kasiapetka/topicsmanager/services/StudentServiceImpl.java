package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Primary
public class StudentServiceImpl implements StudentService{

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
    public void changeEmail(Student student, String email) {
        student.getUser().setEmail(email);
        studentRepository.save(student);
    }

    @Override
    public void changePassword(Student student, String password) {
        student.getUser().setPassword(bCryptPasswordEncoder.encode(password));
        studentRepository.save(student);
    }
}
