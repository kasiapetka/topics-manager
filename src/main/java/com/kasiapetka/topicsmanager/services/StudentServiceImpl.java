package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
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

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository,
                            BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
    public void save(Student Student) {

    }
}
