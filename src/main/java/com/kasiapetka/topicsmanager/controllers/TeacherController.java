package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.DTO.EditAccount;
import com.kasiapetka.topicsmanager.DTO.NewSection;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.services.*;
import com.kasiapetka.topicsmanager.services.impl.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TeacherController {

    private UserService userService;
    private TeacherService teacherService;
    private StudentService studentService;
    private SubjectService subjectService;
    private SectionService sectionService;
    private TopicService topicService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private BCryptPasswordEncoder passwordEncoder;

    public TeacherController(UserService userService, TeacherService teacherService,
                             UserDetailsServiceImpl userDetailsServiceImpl, BCryptPasswordEncoder passwordEncoder,
                             StudentService studentService, SubjectService subjectService,
                             SectionService sectionService, TopicService topicService) {
        this.userService = userService;
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.subjectService = subjectService;
        this.sectionService = sectionService;
        this.topicService = topicService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/teacher/info")
    ResponseEntity<?> returnStudent() {
        User teacherUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(teacherService.findTeacherByUser(teacherUser));
    }

    @PutMapping("/api/teacher/modify")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount editAccount) throws Exception {

        User teacherUser = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);

        EditAccount result = new EditAccount(teacher.getId(), teacherUser.getEmail(), "",
                teacher.getName(), teacher.getSurname(), "", "", "", "");

        if (editAccount.getPassword().equals("")) {
            return ResponseEntity.ok(result);
        }

        int responseCode;

        if (userService.checkCrudentials(editAccount.getPassword(), teacherUser.getPassword())) {
            responseCode = userService.changeCredentials(editAccount, teacherUser);

            if (responseCode == 201) {
                responseCode = 200;
                result.setEmail(editAccount.getNewEmail());
            }
        } else {
            responseCode = 406;
        }

        return ResponseEntity.status(responseCode).body(result);
    }



    @PostMapping("/api/teacher/addsection")
    ResponseEntity<?> addNewSection(@Valid @RequestBody NewSection newSection) {

        Long id = sectionService.addNewSection(newSection);

        if (id > -1) {
            return ResponseEntity.ok().body(id);
        } else {
            if(id == -1){
                return ResponseEntity.status(500).build();
            } else{
                return ResponseEntity.status(409).build();
            }
        }
    }

    @PutMapping("/api/teacher/addstudentstosection")
    ResponseEntity<?> addStudentToSection(@Valid @RequestBody AddStudentsToSectionDTO addStudentsToSectionDTO) {
        if (sectionService.addStudentsToSection(addStudentsToSectionDTO)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/api/teacher/topics/{teacherID}/{subjectID}")
    List<Topic> listTeachersTopics(@PathVariable Long teacherID, @PathVariable Long subjectID){
        return topicService.getTopicListByTeacherID(teacherID, subjectID);
    }

    @GetMapping("/api/teacher/subjects/{teacherID}")
    List<Subject> listTeachersSubjects(@PathVariable Long teacherID){
        return subjectService.getSubjectListByTeacherID(teacherID);
    }

}
