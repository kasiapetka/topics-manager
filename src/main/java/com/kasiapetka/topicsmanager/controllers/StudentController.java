package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.impl.UserDetailsServiceImpl;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class StudentController {

    private UserService userService;
    private StudentService studentService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;


    public StudentController(UserService userService, StudentService studentService,
                             UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.studentService = studentService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/student/info")
    ResponseEntity<?> returnStudent(){
        User studentUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(studentService.findStudentByUser(studentUser));
    }

    @PutMapping("/api/student/modify")
    ResponseEntity<?> updateStudent(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User studentUser = userService.findUserByEmail(oldEmail);
        Student student = studentService.findStudentByUser(studentUser);

        EditAccount result = new EditAccount(student.getAlbum(),studentUser.getEmail(), "",
                student.getName(), student.getSurname(),"","" ,"",
                "");

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        int responseCode = userService.changeCredentials(editAccount, studentUser);

        if(responseCode == 201){
            responseCode = 200;
            result.setEmail(editAccount.getNewEmail());
        }

        return ResponseEntity.status(responseCode).body(result);
    }
}
