package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.StudentDTO;
import com.kasiapetka.topicsmanager.DTO.TeacherDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('Teacher', 'Admin', 'Student')")
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

        List<Section> sections = sectionService.listSectionBySemester(semester_number);

        System.out.println("asd");

        return sections;
    }

    @GetMapping("/api/common/sections/section/{sectionID}")
    Section getSectionById(@PathVariable Long sectionID){
        return sectionService.findSectionById(sectionID);
    }

    @GetMapping("/api/common/students/{semesterNumber}")
    List<StudentDTO> listStudentsBySemester(@PathVariable Integer semesterNumber){
        return studentService.listActiveStudentsBySemester(semesterNumber);
    }

    @GetMapping("/api/common/teachers")
    List<Teacher> listTeachers() {
        return teacherService.listActiveTeachers();
    }

    @GetMapping("/api/common/sections/{sectionID}/members")
    List<Student> listStudentsInSection(@PathVariable Long sectionID){
        return sectionService.listStudentsBySectionId(sectionID);
    }

    @GetMapping("/api/common/sections/{sectionID}/student/{studentID}/checkjoin")
    ResponseEntity<?> checkJoin(@PathVariable(name = "sectionID") Long sectionID, @PathVariable(name = "studentID") Long studentID){
//        Integer responseCode;
//        String conflictSection = "";

//        if(studentService.checkJoin(studentID, sectionID)){
//            responseCode = 200;
//        } else {
//            responseCode = 409;
//
//            Section section = sectionService.findSectionById(sectionID);
//            conflictSection = section.getName() + ' ' + section.getTopic().getName() + ' ' + section.getTopic().getSubject().getName();
//        }

        Section conflictSection = studentService.checkJoin(studentID, sectionID);
        Integer responseCode;
        String responseSection = "";

        if(conflictSection == null){
            responseCode = 200;
        } else {
            responseSection = conflictSection.getName() + ' ' + conflictSection.getTopic().getName() + ' '
                    + conflictSection.getTopic().getSubject().getName();
            responseCode = 409;
        }

        return ResponseEntity.status(responseCode).body(responseSection);
    }

    //POSTs


    //PUTs
    @PutMapping("/api/common/person")
    ResponseEntity<?> doesEmailExist(@RequestBody @Valid String email){
        Integer responseCode;
        User user = userService.findUserByEmail(email);
        Student student = null;
        Teacher teacher = null;
        if(user.getRole().getRoleName().equals("Student"))
            student = studentService.findStudentByUser(user);
        else if(user.getRole().getRoleName().equals("Teacher"))
            teacher = teacherService.findTeacherByUser(user);

        responseCode = 200;

        if(student != null){
            return ResponseEntity.status(responseCode).body(student.convertToStudentDTO());
        } else if(teacher != null){
            return ResponseEntity.status(responseCode).body(teacher.convertToDTO());
        } else if(user.getRole().getRoleName().equals("Admin")){
            TeacherDTO admin = new TeacherDTO();
            admin.setName("System");
            admin.setSurname("Administrator");
            admin.setUser(user.convertToDTO());
            admin.setIsActive(true);
            return ResponseEntity.status(responseCode).body(admin);
        } else {
            responseCode = 409;
            return ResponseEntity.status(responseCode).build();
        }
    }
}
