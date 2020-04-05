package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;

public interface AdminService {
//    void changePassword(User admin, String password);
    List<Teacher> listTeachers();
}
