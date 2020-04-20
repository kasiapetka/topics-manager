package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.DTO.NewSection;

public interface SectionService {
    Section findSectionById(Long id);
    Long addNewSection(NewSection newSection);
    Boolean addStudentsToSection(AddStudentsToSectionDTO addStudentsToSectionDTO);
}
