package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.DTO.NewSection;
import com.kasiapetka.topicsmanager.DTO.NewTopicDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.SubjectService;
import com.kasiapetka.topicsmanager.services.TopicService;
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

    @PostMapping("/api/adminteacher/addsection/{teacherID}")
    ResponseEntity<?> addNewSection(@Valid @RequestBody NewSection newSection, @PathVariable Long teacherID) {

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

    @PutMapping("/api/adminteacher/addstudentstosection")
    ResponseEntity<?> addStudentToSection(@Valid @RequestBody AddStudentsToSectionDTO addStudentsToSectionDTO) {
        if (sectionService.addStudentsToSection(addStudentsToSectionDTO)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }
//    @GetMapping("/api/adminteacher/topics/{subjectID}")
//    List<Topic> listTopicsBySubjectID(@PathVariable Long subjectID){
//        return subjectService.getTopicListBySubjectId(subjectID);
//    }

}
