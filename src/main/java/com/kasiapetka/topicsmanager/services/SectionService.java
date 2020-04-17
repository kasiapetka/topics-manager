package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Topic;

public interface SectionService {
    Boolean addNewSection(Topic topic, Semester semester, Section section);
    Boolean addStudentToSection(Student student, Section section);
}
