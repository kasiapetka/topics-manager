package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Topic;
import com.kasiapetka.topicsmanager.parsingClasses.NewSection;

public interface SectionService {
    Section findSectionById(Long id);
    Boolean addNewSection(NewSection newSection);
    Boolean addStudentToSection(Long studentAlbum, Long sectionId);
}
