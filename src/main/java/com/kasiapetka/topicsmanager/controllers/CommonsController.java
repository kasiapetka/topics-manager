package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CommonsController {

    private SectionService sectionService;
    private StudentService studentService;
    private TeacherService teacherService;
    private UserService userService;

    public CommonsController(SectionService sectionService, StudentService studentService,
                             TeacherService teacherService, UserService userService) {
        this.studentService  = studentService;
        this.teacherService = teacherService;
        this.sectionService = sectionService;
        this.userService = userService;
    }

    //GETs

    @GetMapping("/api/common/sections/{semester_number}")
    List<Section> listSectionsBySemester(@PathVariable Integer semester_number){
        return sectionService.listSectionBySemester(semester_number);
    }

    @GetMapping("/api/common/sections/section/{sectionID}")
    Section getSectionById(@PathVariable Long sectionID){
        return sectionService.findSectionById(sectionID);
    }

    @GetMapping("/api/common/students/{semesterNumber}")
    List<Student> listStudentsBySemester(@PathVariable Integer semesterNumber){
        return studentService.listActiveStudentsBySemester(semesterNumber);
    }

    @GetMapping("/api/common/teachers")
    List<Teacher> listTeachers() {
        return teacherService.listActiveTeachers();
    }

    @PutMapping("/api/common/person")
    ResponseEntity<?> doesEmailExist(@RequestBody @Valid String email){
        Integer responseCode;
        User user = userService.findUserByEmail(email);

        if(user != null){
            responseCode = 200;
        } else {
            responseCode = 409;
        }

        return ResponseEntity.status(responseCode).build();
    }

    //POSTs


    //PUTs
}
