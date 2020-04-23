package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminTeacherCommonsController {

    private SubjectService subjectService;
    private StudentService studentService;

    public AdminTeacherCommonsController(SubjectService subjectService, StudentService studentService){
        this.subjectService = subjectService;
        this.studentService = studentService;
    }


    //@GetMapping("/api/teacher/subjects")
    @GetMapping("/api/adminteacher/subjects")
    List<Subject> listSubjects() {
        return subjectService.getSubjectsList();
    }

    //@GetMapping("/api/teacher/topics/{id}")
    @GetMapping("/api/adminteacher/topics/{id}")
    List<Topic> listTopics(@PathVariable Long id) {
        return subjectService.getTopicListBySubjectId(id);
    }

//    @GetMapping("/api/admin/students")
//    @GetMapping("/api/teacher/students")
    @GetMapping("/api/adminteacher/students")
    List<Student> listStudents() {
        return studentService.listActiveStudents();
    }



}
