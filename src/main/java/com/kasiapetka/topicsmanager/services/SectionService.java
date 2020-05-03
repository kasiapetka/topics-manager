package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.DTO.NewSection;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;

import java.util.List;

public interface SectionService {
    Section findSectionById(Long id);
    List<Section> listSections();
    List<Section> listSectionBySemester(Integer semester_number);
    List<Student> listStudentsBySectionId(Long sectionID);

    Long addNewSection(NewSection newSection);
    Boolean addStudentsToSection(AddStudentsToSectionDTO addStudentsToSectionDTO);
    Integer deleteSection(Long sectionID);
    Integer changeState(Long sectionId, Character state);
}
