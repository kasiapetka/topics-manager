package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.Topic;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

public interface SubjectService {
    Boolean createSubject(Subject subject);
    Boolean addTeacherToSubject(Teacher teacher, Subject subject);
    Boolean addTopicToSubject(Topic topic, Subject subject);
}
