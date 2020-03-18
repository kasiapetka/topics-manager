package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
public class IndexController {

    //private final Logger log = LoggerFactory.getLogger(IndexController.class);
    private StudentRepository studentRepository;
    private UserRepository userRepository;

    public IndexController(StudentRepository studentRepository,UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/students")
    Iterable <Student> student() {
        return studentRepository.findAll();
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user) {
        System.out.println(user.getEmail()+" "+ user.getPassword());
        //Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       // System.out.println(auth.getName() + " ci ");
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/api/login")
//    public ResponseEntity<?> login() {
//        //doesnt work
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        //User user = userRepository.findByEmail(auth.getName());
//
//        System.out.println(auth.getName() + " ci ");
//        return ResponseEntity.ok().build();
//    }

}