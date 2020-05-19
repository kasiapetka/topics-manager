package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.*;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.SubjectService;
import com.kasiapetka.topicsmanager.services.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('Teacher', 'Admin')")
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

    //GETs

    @GetMapping("/api/adminteacher/students")
    List<Student> listStudents() {
        return studentService.listActiveStudents();
    }

    @GetMapping("/api/adminteacher/sections/{sectionID}/dates")
    List<String> getDatesForSection(@PathVariable Long sectionID){
        return sectionService.getDatesForSection(sectionID);
    }

    @GetMapping("/api/adminteacher/students/{sectionID}/members")
    List<Student> listStudentsInSection(@PathVariable Long sectionID){
        return sectionService.listStudentsBySectionId(sectionID);
    }

    @GetMapping("/api/adminteacher/topics/{subjectID}")
    List<Topic> listTopicsInSubject(@PathVariable Long subjectID){
        return topicService.getTopicsListBySubjectID(subjectID);
    }

    @GetMapping("/api/adminteacher/sections/{sectionID}/dates/{date}")
    List<StudentPresenceExtendedDTO> getDatesForPresence(@PathVariable Long sectionID, @PathVariable String date){
        return sectionService.findStudentsInSectionByDate(sectionID, date);
    }

    @GetMapping("/api/adminteacher/subjects/{teacherID}")
    List<Subject> listSubjects(@PathVariable Long teacherID){
        return subjectService.listSubjectsByTeacherId(teacherID);
    }


    //POSTs

    @PostMapping("/api/adminteacher/addtopic")
    ResponseEntity<?> addTopic(@Valid @RequestBody NewTopicDTO newTopicDTO){
        Integer responseCode = topicService.addNewTopic(newTopicDTO);
        return ResponseEntity.status(responseCode).build();
    }

    @PostMapping("/api/adminteacher/addsection")
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

    //PUTs

    @PutMapping("/api/adminteacher/sections/{sectionID}/grades")
    ResponseEntity<?> issueGrades(@Valid @RequestBody StudentGradeListDTO studentGradeListDTO,
                                  @PathVariable Long sectionID){

        Integer responseCode = sectionService.issueGrades(sectionID, studentGradeListDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PutMapping("/api/adminteacher/deletesection/{sectionID}")
    ResponseEntity<?> deleteSection(@PathVariable Long sectionID){
        Integer responseCode = sectionService.deleteSection(sectionID);
        return ResponseEntity.status(responseCode).build();
    }

    @PutMapping("/api/adminteacher/addstudentstosection")
    ResponseEntity<?> addStudentToSection(@Valid @RequestBody AddStudentsToSectionDTO addStudentsToSectionDTO) {
        if (sectionService.addStudentsToSection(addStudentsToSectionDTO)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/api/adminteacher/sections/{sectionID}/state")
    ResponseEntity<?> changeSectionState(@PathVariable Long sectionID, @Valid @RequestBody Character state){
        Integer responseCode = sectionService.changeState(sectionID, state);

        return ResponseEntity.status(responseCode).build();
    }

    @PutMapping("/api/adminteacher/sections/{sectionID}/presence")
    ResponseEntity<?> issuePresence(@Valid @RequestBody StudentPresenceListDTO studentPresenceListDTO,
                                  @PathVariable Long sectionID){

        Integer responseCode = sectionService.issuePresence(sectionID, studentPresenceListDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PutMapping("/api/adminteacher/editstudentsinsection")
    ResponseEntity<?> editStudentsInSection(@Valid @RequestBody AddStudentsToSectionDTO studentsToSectionDTO){

        //TODO make this separate function? 1
        List<StudentDTO> studentDTOS = new ArrayList<>();
        for(Long album : studentsToSectionDTO.getStudentsAlbums()){
            studentDTOS.add(studentService.findStudentByAlbum(album).convertToStudentDTO());
        }

        Integer responseCode = sectionService.editStudentsInSection(studentsToSectionDTO);

        return ResponseEntity.status(responseCode).body(studentDTOS);
    }

    @PutMapping("/api/adminteacher/sections/section/{sectionID}/edit")
    ResponseEntity<?> editSection(@Valid @RequestBody NewSection newSection, @PathVariable Long sectionID){

        //@TODO 2
        Integer responseCode = sectionService.editSection(newSection, sectionID);

        return ResponseEntity.status(responseCode).build();
    }



//    @GetMapping("/api/adminteacher/topics/{subjectID}")
//    List<Topic> listTopicsBySubjectID(@PathVariable Long subjectID){
//        return subjectService.getTopicListBySubjectId(subjectID);
//    }

}
