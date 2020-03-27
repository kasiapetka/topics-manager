package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.model.RegisterForm;
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
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user) {
        System.out.println(user.getEmail()+" "+ user.getPassword());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterForm user) {
        System.out.println(user.toString());
        return ResponseEntity.ok().build();
    }


}