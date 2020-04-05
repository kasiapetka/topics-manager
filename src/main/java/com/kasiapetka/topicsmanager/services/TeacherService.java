package com.kasiapetka.topicsmanager.services;


import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;

public interface TeacherService {
//    void changePassword(Teacher student, String password);
    Teacher findTeacherByUser(User user);
    Teacher findTeacherById(Long id);
}
