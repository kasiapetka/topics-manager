package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Topic;

import java.util.List;

public interface SubjectService {
    Boolean addNewSubject(Subject subject);
    List<Subject> getSubjectsList();
    List<Topic> getTopicListBySubjectId(Long id);
}
