package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;

import java.util.List;

public interface AdminService {
    //    void changePassword(User admin, String newPassword);
    List<Student> listStudents();
}