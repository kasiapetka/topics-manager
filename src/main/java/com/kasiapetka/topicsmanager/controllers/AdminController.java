package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class AdminController {

    private UserService userService;
    private AdminService adminService;
    private TeacherService teacherService;
    private StudentService studentService;

    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;

    public AdminController(UserService userService, AdminService adminService,
                           UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                           TeacherService teacherService, StudentService studentService) {
        this.userService = userService;
        this.adminService = adminService;
        this.teacherService=teacherService;
        this.studentService = studentService;

        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }


    @PutMapping("/api/admin/modify")
    ResponseEntity<?> updateAdmin(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(oldEmail);


        EditAccount result = new EditAccount(adminUser.getEmail(), "", "", "", "", "");

        if (editAccount.getPassword().equals("")) {
            return ResponseEntity.ok(result);
        }

        if (passwordEncoder.matches(editAccount.getPassword(), adminUser.getPassword())) {
            System.out.println("Password correct");

            if (!editAccount.getNewEmail().equals("")) {
                System.out.println("Changing email");
                if (!userService.changeEmail(adminUser, editAccount.getNewEmail())) {
                    return ResponseEntity.status(409).body(result);
                } else {
                    result.setEmail(editAccount.getNewEmail());
                }
            } else {
                System.out.println("New Email not given");
            }

            if (!editAccount.getNewPassword().equals("")) {
                System.out.println("Changing password");
                userService.changePassword(adminUser, editAccount.getNewPassword());
            }

            return ResponseEntity.ok(result);

        } else {
            //Bad password given
            return ResponseEntity.status(406).body(result);
        }
    }

    @PutMapping("/api/admin/modifyTeacher")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = editAccount.getEmail();
        User teacherUser = userService.findUserByEmail(oldEmail);
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(adminEmail);

        EditAccount result = new EditAccount(teacherUser.getEmail(), "", "", "", teacher.getName(), teacher.getSurname());

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        if(passwordEncoder.matches(editAccount.getPassword(), adminUser.getPassword())){
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

    @GetMapping("/api/admin/teachers")
    List<Teacher> listTeachers(){
        return adminService.listTeachers();
    }

    @PutMapping("/api/admin/deleteTeacher")
    ResponseEntity<?> deleteTeacher(@Valid @RequestBody Long id){
        if(teacherService.deleteTeacher(id)){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/api/admin/deleteStudent")
    ResponseEntity<?> deleteStudent(@Valid @RequestBody Long album){
        if(studentService.deleteStudent(album)){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }

}
