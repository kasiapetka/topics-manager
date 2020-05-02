package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.NewTopicDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class AdminTeacherCommonsController {

    private SubjectService subjectService;
    private StudentService studentService;
    private TopicService topicService;
    private SectionService sectionService;

    public AdminTeacherCommonsController(SubjectService subjectService, StudentService studentService,
                                         TopicService topicService, SectionService sectionService){
        this.subjectService = subjectService;
        this.studentService = studentService;
        this.topicService = topicService;
        this.sectionService = sectionService;
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

    @GetMapping("/api/adminteacher/students/{semesterNumber}")
    List<Student> listStudentsBySemester(@PathVariable Integer semesterNumber){
        return studentService.listActiveStudentsBySemester(semesterNumber);
    }

    @PostMapping("/api/adminteacher/addtopic")
    ResponseEntity<?> addTopic(@Valid @RequestBody NewTopicDTO newTopicDTO){
        Integer responseCode = topicService.addNewTopic(newTopicDTO);
        return ResponseEntity.status(responseCode).build();
    }

    @GetMapping("/api/adminteacher/sections/{semester_number}")
    List<Section> listSectionsBySemester(@PathVariable Integer semester_number){
        return sectionService.listSectionBySemester(semester_number);
    }

    @PutMapping("/api/adminteacher/deletesection/{sectionID}")
    ResponseEntity<?> deleteSection(@PathVariable Long sectionID){
        Integer responseCode = sectionService.deleteSection(sectionID);
        return ResponseEntity.status(responseCode).build();
    }

//    @GetMapping("/api/adminteacher/topics/{subjectID}")
//    List<Topic> listTopicsBySubjectID(@PathVariable Long subjectID){
//        return subjectService.getTopicListBySubjectId(subjectID);
//    }

}
