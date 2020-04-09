package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.StudentService;
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

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacherUser = userService.findUserByEmail(oldEmail);
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);

        EditAccount result = new EditAccount(teacher.getId(),teacherUser.getEmail(), "",
                 teacher.getName(), teacher.getSurname(),"","","","");

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

    @PutMapping("/api/teacher/modifyStudent")
    ResponseEntity<?> updateStudent(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = editAccount.getEmail();
        Student student = studentService.findStudentByAlbum(editAccount.getId());

        String teacherEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacherUser = userService.findUserByEmail(teacherEmail);

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

        if(passwordEncoder.matches(editAccount.getPassword(), teacherUser.getPassword())){
            System.out.println("Password correct");

            if(!editAccount.getNewEmail().equals("") && studentUser != null){
                System.out.println("Changing email");
                if(!userService.changeEmail(studentUser, editAccount.getNewEmail())){
                    return ResponseEntity.status(409).body(result);
                } else {
                    result.setEmail(editAccount.getNewEmail());
                }
            } else {
                System.out.println("New Email not given");
            }

            if(!editAccount.getNewPassword().equals("") && studentUser != null){
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

    @GetMapping("/api/teacher/students")
    List<Student> listStudents(){
        return teacherService.listStudents();
    }
}
