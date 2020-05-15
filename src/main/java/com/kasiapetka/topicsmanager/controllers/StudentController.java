package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.DTO.EditAccount;
import com.kasiapetka.topicsmanager.DTO.SectionInfoDTO;
import com.kasiapetka.topicsmanager.DTO.SectionInfoForStudentDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserService;
import com.kasiapetka.topicsmanager.services.impl.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class StudentController {

    private UserService userService;
    private StudentService studentService;
    private SectionService sectionService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;


    public StudentController(UserService userService, StudentService studentService,
                             UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                             SectionService sectionService) {
        this.userService = userService;
        this.studentService = studentService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
        this.sectionService = sectionService;
    }

    //GETs

    @GetMapping("/api/student/info")
    ResponseEntity<?> returnStudent() {
        User studentUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(studentService.findStudentByUser(studentUser));
    }

    @GetMapping("/api/student/section/{sectionID}/info")
    SectionInfoDTO getSectionInfor(@PathVariable Long sectionID){
        return sectionService.getSectionInfo(sectionID);
    }

    @GetMapping("/api/student/section/{semesterID}")
    List<Section> listSectionsInSemester(@PathVariable Integer semesterID){
        return sectionService.listSectionBySemester(semesterID);
    }

    @GetMapping("/api/student/sections")
    List<Section> listStudentsSections(){
        return studentService.listLoggedStudentSections();
    }

    //todo zapytac o url
    @GetMapping("/api/student/studentsection/{sectionID}/info")
    SectionInfoForStudentDTO getSectionInfoForStudent(@PathVariable Long sectionID){
        return sectionService.getSectionInfoForLoggedStudent(sectionID);
    }

    //POSTs


    //PUTs

    @PutMapping("/api/student/modify")
    ResponseEntity<?> updateStudent(@Valid @RequestBody EditAccount editAccount) throws Exception {

        System.out.println(editAccount);
        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User studentUser = userService.findUserByEmail(oldEmail);
        Student student = studentService.findStudentByUser(studentUser);

        EditAccount result = new EditAccount(student.getAlbum(), studentUser.getEmail(), "",
                student.getName(), student.getSurname(), "", "", "",
                "");

        if (editAccount.getPassword().equals("")) {
            return ResponseEntity.ok(result);
        }

        int responseCode;

        if (userService.checkCrudentials(editAccount.getPassword(), studentUser.getPassword())) {
            responseCode = userService.changeCredentials(editAccount, studentUser);

            if (responseCode == 201) {
                responseCode = 200;
                result.setEmail(editAccount.getNewEmail());
            }
        } else {
            responseCode = 406;
        }

        return ResponseEntity.status(responseCode).body(result);
    }

    @PutMapping("/api/student/{sectionID}/join")
    ResponseEntity<?> joinSection(@PathVariable Long sectionID){

        Integer responseCode = studentService.joinSection(sectionID);
        List<Student> members = sectionService.listStudentsBySectionId(sectionID);

        return ResponseEntity.status(responseCode).body(members);
    }

    @PutMapping("/api/student/{sectionID}/leave")
    ResponseEntity<?> leaveSection(@PathVariable Long sectionID){

        Integer responseCode = studentService.leaveSection(sectionID);
        List<Student> members = sectionService.listStudentsBySectionId(sectionID);

        return ResponseEntity.status(responseCode).body(members);
    }
}
