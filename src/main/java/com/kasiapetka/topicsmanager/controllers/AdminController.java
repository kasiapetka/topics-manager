package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.AddSubjectDTO;
import com.kasiapetka.topicsmanager.DTO.EditAccount;
import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.DTO.TeacherListDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.services.*;
import com.kasiapetka.topicsmanager.services.impl.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@PreAuthorize("hasRole('Admin')")
@RestController
public class AdminController {

    private UserService userService;
    private AdminService adminService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;
    private TeacherService teacherService;
    private StudentService studentService;
    private SubjectService subjectService;
    private TopicService topicService;

    public AdminController(UserService userService, AdminService adminService,
                           UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                           TeacherService teacherService, StudentService studentService, SubjectService subjectService,
                           TopicService topicService) {
        this.userService = userService;
        this.adminService = adminService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.subjectService = subjectService;
        this.topicService = topicService;
    }

    //GETs

    @GetMapping("/api/admin/teachers")
    List<Teacher> listTeachers() {
        return teacherService.listActiveTeachers();
    }

    @GetMapping("/api/admin/teachers/{id}")
    List<Teacher> listTeachersBySubject(@PathVariable Long id) {
        return subjectService.getTeachersBySubjectId(id);
    }

    @GetMapping("/api/admin/subjects")
    List<Subject> listSubjects(){
        return subjectService.getSubjectsList();
    }

    //POSTs

    @PostMapping("/api/admin/addstudent")
    ResponseEntity<?> addStudent(@Valid @RequestBody NewStudentOrTeacherDTO studentOrTeacherDTO){

        Integer responseCode = studentService.addNewStudent(studentOrTeacherDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PostMapping("/api/admin/addteacher")
    ResponseEntity<?> addTeacher(@Valid @RequestBody NewStudentOrTeacherDTO studentOrTeacherDTO){

        Integer responseCode = teacherService.addNewTeacher(studentOrTeacherDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PostMapping("/api/admin/addsubject")
    ResponseEntity<?> addSubject(@Valid @RequestBody AddSubjectDTO addSubjectDTO){

        Integer responseCode = subjectService.addNewSubject(addSubjectDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PostMapping("/api/admin/editteachersinsubject/{subjectID}")
    ResponseEntity<?> editTeachersInSubject(@Valid @RequestBody TeacherListDTO teacherList, @PathVariable Long subjectID){

        Integer responseCode = subjectService.editSubjectsTeachers(teacherList, subjectID);

        return ResponseEntity.status(responseCode).build();
    }

    //PUTs

    @PutMapping("/api/admin/modify")
    ResponseEntity<?> updateAdmin(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(oldEmail);


        EditAccount result = new EditAccount(adminUser.getId(), adminUser.getEmail(), "", "",
                "", "", "", "", "");

        if (editAccount.getPassword().equals("")) {
            return ResponseEntity.ok(result);
        }

        int responseCode;

        if (userService.checkCrudentials(editAccount.getPassword(), adminUser.getPassword())) {
            responseCode = userService.changeCredentials(editAccount, adminUser);

            if (responseCode == 201) {
                responseCode = 200;
                result.setEmail(editAccount.getNewEmail());
            }
        } else {
            responseCode = 406;
        }

        return ResponseEntity.status(responseCode).body(result);
    }

    @PutMapping("/api/admin/modifyteacher")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount editAccount) throws Exception {

        Teacher teacher = teacherService.findTeacherById(editAccount.getId());
        User adminUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

        String teacherEmail = "";
        User teacherUser = teacher.getUser();

        if (teacherUser != null) {
            System.out.println(teacherUser);
            teacherEmail = teacherUser.getEmail();
            System.out.println(teacherEmail);
        }

        EditAccount result = new EditAccount(teacher.getId(), teacherEmail, "", teacher.getName(),
                teacher.getSurname(), "", "", "", "");

        if (editAccount.getPassword().equals("")) {

            return ResponseEntity.ok(result);
        }

        int responseCode;
        if (userService.checkCrudentials(editAccount.getPassword(), adminUser.getPassword())) {
            responseCode = userService.changeCredentials(editAccount, teacherUser);

            if (responseCode == 201 || responseCode == 200) {
                responseCode = 200;
                result.setEmail(editAccount.getNewEmail());
                if (!editAccount.getNewName().equals("")) {
                    System.out.println("Changing newName");
                    teacherService.changeName(teacher, editAccount.getNewName());
                    result.setName(editAccount.getNewName());
                }
                if (!editAccount.getNewSurname().equals("")) {
                    System.out.println("Changing newSurname");
                    teacherService.changeSurname(teacher, editAccount.getNewSurname());
                    result.setSurname(editAccount.getNewSurname());
                }
            }
        } else {
            responseCode = 406;
        }

        // if only name or surname were change this is to fill object returned to the front
        if(editAccount.getNewEmail().equals("")){
            result.setEmail(teacherEmail);
        }


        return ResponseEntity.status(responseCode).body(result);
    }

    @PutMapping("/api/admin/modifystudent")
    ResponseEntity<?> updateStudent(@Valid @RequestBody EditAccount editAccount) throws Exception {

        Student student = studentService.findStudentByAlbum(editAccount.getId());

        User adminUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

        String studentEmail = "";
        User studentUser = student.getUser();

        if (studentUser != null) {
            studentEmail = studentUser.getEmail();
        }

        EditAccount result = new EditAccount(student.getAlbum(), studentEmail, "", student.getName(),
                student.getSurname(), "", "", "", "");

        if (editAccount.getPassword().equals("")) {
            return ResponseEntity.ok(result);
        }

        int responseCode;
        if (userService.checkCrudentials(editAccount.getPassword(), adminUser.getPassword())) {
            responseCode = userService.changeCredentials(editAccount, studentUser);

            if (responseCode == 201 || responseCode == 200) {
                responseCode = 200;
                result.setEmail(editAccount.getNewEmail());
                if (!editAccount.getNewName().equals("")) {
                    System.out.println("Changing newName");
                    studentService.changeName(student, editAccount.getNewName());
                    result.setName(editAccount.getNewName());
                }
                if (!editAccount.getNewSurname().equals("")) {
                    System.out.println("Changing newSurname");
                    studentService.changeSurname(student, editAccount.getNewSurname());
                    result.setSurname(editAccount.getNewSurname());
                }
            }
        } else {
            responseCode = 406;
        }

        // if only name or surname were change this is to fill object returned to the front
        if(editAccount.getNewEmail().equals("")){
            result.setEmail(studentEmail);
        }

        return ResponseEntity.status(responseCode).body(result);
    }


    @PutMapping("/api/admin/deleteteacher")
    ResponseEntity<?> deleteTeacher(@Valid @RequestBody Long id) {
        if (teacherService.deleteTeacher(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/api/admin/deletestudent")
    ResponseEntity<?> deleteStudent(@Valid @RequestBody Long album) {
        if (studentService.deleteStudent(album)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }


//    @GetMapping("/api/admin/topics/{teacherID}/{subjectID}")
//    List<Topic> listTeachersTopics(@PathVariable Long teacherID, @PathVariable Long subjectID){
//        return topicService.getTopicListByTeacherID(teacherID, subjectID);
//    }

}
