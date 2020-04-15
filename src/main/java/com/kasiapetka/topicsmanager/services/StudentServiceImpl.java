package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.StudentSection;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Primary
public class StudentServiceImpl implements StudentService {

    protected StudentRepository studentRepository;
    protected SectionRepository sectionRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, SectionRepository sectionRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.sectionRepository = sectionRepository;
    }

    @Override
    public Student findStudentByAlbum(Long album) {
        Optional<Student> studentOptional = studentRepository.findById(album);
        if (!studentOptional.isPresent()) {
            return null;
        }
        return studentOptional.get();
    }

    @Override
    public Student findStudentByUser(User user) {
        return studentRepository.findByUser(user);
    }

}
