package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.TeacherService;
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
import java.util.List;

@RestController
public class TeacherController {
    private UserService userService;
    private TeacherService teacherService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;


    public TeacherController(UserService userService, TeacherService teacherService,
                             UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.teacherService = teacherService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/teacher/info")
    ResponseEntity<?> returnStudent(){
        User teacherUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(teacherService.findTeacherByUser(teacherUser));
    }

    @PutMapping("/api/teacher/modify")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount editAccount) throws Exception{

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacherUser = userService.findUserByEmail(oldEmail);
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);

        EditAccount result = new EditAccount(teacherUser.getEmail(), "", "", "", teacher.getName(), teacher.getSurname());

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        if(passwordEncoder.matches(editAccount.getPassword(), teacherUser.getPassword())){
            System.out.println("Password correct");

            if(!editAccount.getNewEmail().equals("")){
                System.out.println("Changing email");
                if(!userService.changeEmail(teacherUser, editAccount.getNewEmail())){
                    return ResponseEntity.status(409).body(result);
                } else {
                    result.setEmail(editAccount.getNewEmail());
                }
            } else {
                System.out.println("New Email not given");
            }

            if(!editAccount.getNewPassword().equals("")){
                System.out.println("Changing password");
                userService.changePassword(teacherUser, editAccount.getNewPassword());
            }

            return ResponseEntity.ok(result);

        } else {
            //Bad password given
            return ResponseEntity.status(406).body(result);
        }
    }

    @GetMapping("/api/teacher/students")
    List<Student> listStudents(){
        return teacherService.listStudents();
    }
}
