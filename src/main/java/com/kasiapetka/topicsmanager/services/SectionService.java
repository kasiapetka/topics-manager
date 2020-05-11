package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.*;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.StudentSection;

import java.util.List;

public interface SectionService {
    Section findSectionById(Long id);
    List<Section> listSections();
    List<Section> listSectionBySemester(Integer semester_number);
    List<Student> listStudentsBySectionId(Long sectionID);
    List<String> getDatesForSection(Long sectionID);
    List<StudentSection> findStudentSectionsBySection(Section section);
    List<StudentPresenceExtendedDTO> findStudentsInSectionByDate(Long sectionId, String date);
    SectionInfoDTO getSectionInfo(Long sectionId);
    SectionInfoForStudentDTO getSectionInfoForLoggedStudent(Long sectionId);

    Long addNewSection(NewSection newSection);
    Integer editSection(NewSection newSection, Long sectionID);
    Boolean addStudentsToSection(AddStudentsToSectionDTO addStudentsToSectionDTO);
    Integer editStudentsInSection(AddStudentsToSectionDTO studentsToSectionDTO);
    Integer deleteSection(Long sectionID);
    Integer changeState(Long sectionId, Character state);
    Integer issuePresence(Long sectionId, StudentPresenceListDTO studentPresenceListDTO);
    Integer issueGrades(Long sectionId, StudentGradeListDTO studentGradeListDTO);
}
