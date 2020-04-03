package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserDetailsServiceImpl;
import com.kasiapetka.topicsmanager.services.UserService;
import com.kasiapetka.topicsmanager.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class StudentController {

    private UserService userService;
    private StudentService studentService;
    private UserDetailsServiceImpl userDetailsServiceImpl;


    public StudentController(StudentService studentService, UserService userService,
                             UserDetailsServiceImpl userDetailsServiceImpl) {
        this.studentService = studentService;
        this.userService = userService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

   @PutMapping("/api/student/modify")
    ResponseEntity<?> updateStudent(@Valid @RequestBody User user) throws Exception{

       String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
       User studentUser = userService.findUserByEmail(oldEmail);
       Student result = studentService.findStudentByUser(studentUser);

       if (user.getEmail().equals(result.getUser().getEmail()) && user.getPassword().isEmpty()) {
           return ResponseEntity.ok(result);
       } else {
           if (!user.getEmail().equals(result.getUser().getEmail())) {
            //TODO zmiana maila nie działa - cos z tokenem
               //   studentService.changeEmail(result, user.getEmail());
           }
           if (!user.getPassword().isEmpty()) {
               //zmien haslo
               studentService.changePassword(result, user.getPassword());
           }
       }

       result= studentService.findStudentByAlbum(result.getAlbum());
        System.out.println(result);
       return ResponseEntity.ok(result);
   }

}
