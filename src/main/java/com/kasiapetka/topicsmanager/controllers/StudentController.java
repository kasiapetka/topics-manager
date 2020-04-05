package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserDetailsServiceImpl;
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
//       System.out.println("nowy email " + user.getEmail());
//       System.out.println("nowe haslo  " + user.getPassword());
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User studentUser = userService.findUserByEmail(oldEmail);
        Student student = studentService.findStudentByUser(studentUser);

        if(editAccount.getPassword().equals("")){
            EditAccount result = new EditAccount(studentUser.getEmail(), "", "", "", student.getName(), student.getSurname());
            return ResponseEntity.ok(result);
        }

        if(passwordEncoder.matches(editAccount.getPassword(), studentUser.getPassword())){
            System.out.println("Password correct");

            if(!editAccount.getNewEmail().equals("")){
                System.out.println("Changing email");
                User temp = userService.findUserByEmail(editAccount.getNewEmail());
                if(!(temp == null)){
                    System.out.println("Mail already exists");
                    EditAccount result = new EditAccount(studentUser.getEmail(), "", "", "", student.getName(), student.getSurname());
                    return ResponseEntity.status(409).body(result);
                }
                userService.changeEmail(studentUser, editAccount.getNewEmail());
            } else {
                System.out.println("New Email not given");
            }

            if(!editAccount.getNewPassword().equals("")){
                System.out.println("Changing password");
                userService.changePassword(studentUser, editAccount.getNewPassword());
            }

            EditAccount result = new EditAccount(studentUser.getEmail(), "", "", "", student.getName(), student.getSurname());
            return ResponseEntity.ok(result);

        } else {
            EditAccount result = new EditAccount(studentUser.getEmail(), "", "", "", student.getName(), student.getSurname());
            return ResponseEntity.status(406).body(result);
        }
    }

}
