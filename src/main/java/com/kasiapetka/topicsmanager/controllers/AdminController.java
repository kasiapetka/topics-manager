package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.*;
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
public class AdminController {

    private UserService userService;
    private AdminService adminService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;
    private TeacherService teacherService;
    private StudentService studentService;

    public AdminController(UserService userService, AdminService adminService,
                           UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                           TeacherService teacherService, StudentService studentService) {
        this.userService = userService;
        this.adminService = adminService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
        this.teacherService=teacherService;
        this.studentService = studentService;
    }


    @PutMapping("/api/admin/modify")
    ResponseEntity<?> updateAdmin(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(oldEmail);


        EditAccount result = new EditAccount(adminUser.getId(),adminUser.getEmail(), "", "",
                "", "", "","","");

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
        Teacher teacher = teacherService.findTeacherById(editAccount.getId());
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(adminEmail);

        String teacherEmail="";
        User teacherUser=teacher.getUser();

        if(teacherUser !=null){
            teacherEmail = teacherUser.getEmail();
        }


        EditAccount result = new EditAccount(teacher.getId(),teacherEmail, "", teacher.getName(),
                teacher.getSurname(),"","","","");

        System.out.println(editAccount);

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        if(passwordEncoder.matches(editAccount.getPassword(), adminUser.getPassword())){
            System.out.println("Password correct");

            if(!editAccount.getNewEmail().equals("") && teacherUser!=null){
                System.out.println("Changing email");
                if(!userService.changeEmail(teacherUser, editAccount.getNewEmail())){
                    return ResponseEntity.status(409).body(result);
                } else {
                    result.setEmail(editAccount.getNewEmail());
                }
            } else {
                System.out.println("New Email not given");
            }

            if(!editAccount.getNewPassword().equals("") && teacherUser!=null){
                System.out.println("Changing password");
                userService.changePassword(teacherUser, editAccount.getNewPassword());
            }

            if(!editAccount.getNewName().equals("")){
                System.out.println("Changing name");
                teacherService.changeName(teacher,editAccount.getNewName());
                result.setName(editAccount.getNewName());
            }
            if(!editAccount.getNewSurname().equals("")){
                System.out.println("Changing surname");
                teacherService.changeSurname(teacher,editAccount.getNewSurname());
                result.setSurname(editAccount.getNewSurname());
            }
            System.out.println(result);
            return ResponseEntity.ok(result);

        } else {
            //Bad password given
            return ResponseEntity.status(406).body(result);
        }
    }

    @PutMapping("/api/admin/modifyStudent")
    ResponseEntity<?> updateStudent(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = editAccount.getEmail();
        Student student = studentService.findStudentByAlbum(editAccount.getId());

        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(adminEmail);

        String studentEmail="";
        User studentUser=student.getUser();

        if(studentUser!=null){
            studentEmail = studentUser.getEmail();
        }

        EditAccount result = new EditAccount(student.getAlbum(),studentEmail, "",  student.getName(),
                student.getSurname(),"","","", "");

        System.out.println(editAccount);

        if(editAccount.getPassword().equals("")){
            return ResponseEntity.ok(result);
        }

        if(passwordEncoder.matches(editAccount.getPassword(), adminUser.getPassword())){
            System.out.println("Password correct");

            if(!editAccount.getNewEmail().equals("") && studentUser!=null){
                System.out.println("Changing email");
                if(!userService.changeEmail(studentUser, editAccount.getNewEmail())){
                    return ResponseEntity.status(409).body(result);
                } else {
                    result.setEmail(editAccount.getNewEmail());
                }
            } else {
                System.out.println("New Email not given");
            }

            if(!editAccount.getNewPassword().equals("") && studentUser!=null){
                System.out.println("Changing password");
                userService.changePassword(studentUser, editAccount.getNewPassword());
            }

            if(!editAccount.getNewName().equals("")){
                System.out.println("Changing name");
                studentService.changeName(student,editAccount.getNewName());
                result.setName(editAccount.getNewName());
            }
            if(!editAccount.getNewSurname().equals("")){
                System.out.println("Changing surname");
                studentService.changeSurname(student,editAccount.getNewSurname());
                result.setSurname(editAccount.getNewSurname());
            }
            System.out.println(result);
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

    @GetMapping("/api/admin/students")
    List<Student> listStudents(){
        return adminService.listStudents();
    }
}
