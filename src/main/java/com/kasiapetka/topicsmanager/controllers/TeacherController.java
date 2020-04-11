package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TeacherService;
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
import java.util.List;

@RestController
public class TeacherController {
    private UserService userService;
    private TeacherService teacherService;
    private StudentService studentService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;


    public TeacherController(UserService userService, TeacherService teacherService,
                             UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                             StudentService studentService) {
        this.userService = userService;
        this.teacherService = teacherService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
        this.studentService = studentService;
    }

    @GetMapping("/api/teacher/info")
    ResponseEntity<?> returnStudent(){
        User teacherUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(teacherService.findTeacherByUser(teacherUser));
    }

    @PutMapping("/api/teacher/modify")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount editAccount) throws Exception{

        User teacherUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);

        EditAccount result = new EditAccount(teacher.getId(),teacherUser.getEmail(), "",
                 teacher.getName(), teacher.getSurname(),"","","","");

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        int responseCode = userService.changeCredentials(editAccount, teacherUser);

        if(responseCode == 201){
            responseCode = 200;
            result.setEmail(editAccount.getNewEmail());
        }

        return ResponseEntity.status(responseCode).body(result);
    }

    @GetMapping("/api/teacher/students")
    List<Student> listStudents(){
        return teacherService.listStudents();
    }
}
