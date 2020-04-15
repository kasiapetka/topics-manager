package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Topic;

import java.util.ArrayList;

public interface SectionService {

    Boolean addStudentToSection(Student student, Section section);
    Boolean addNewSection(Section section, Semester semester, Topic topic);
    Boolean deledeSection(Section section);
    Boolean removeStudentFromSection(Student student, Section section);
    Boolean setTopicForSection(Topic topic, Section section);
    Boolean importStudents(ArrayList<Student> students);
}
