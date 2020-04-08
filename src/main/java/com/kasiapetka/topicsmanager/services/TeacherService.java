package com.kasiapetka.topicsmanager.services;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;

public interface TeacherService {
//    void changePassword(Teacher student, String password);
    Teacher findTeacherByUser(User user);
    Teacher findTeacherById(Long id);
    List<Student> listStudents();
}
