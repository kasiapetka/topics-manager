package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.AddSubjectDTO;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;

import java.util.List;

public interface SubjectService {
    // for database loader probably to delete later
    Boolean addNewSubject(Subject subject);
    Subject findSubjectById(Long id);
    Subject findSubjectByName(String name);
    Integer addNewSubject(AddSubjectDTO addSubjectDTO);
    Integer editSubjectsTeachers(List<Teacher> teacherList, Long subjectID);
    List<Subject> getSubjectsList();
    List<Topic> getTopicListBySubjectId(Long id);
    List<Teacher> getTeachersBySubjectId(Long id);
}
