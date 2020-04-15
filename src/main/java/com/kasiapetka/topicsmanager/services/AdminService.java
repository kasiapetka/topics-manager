package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Subject;
import com.kasiapetka.topicsmanager.model.Teacher;

import java.util.List;

public interface AdminService {
    //    void changePassword(User admin, String password);
    List<Teacher> listTeachers();
    List<Student> listStudents(Integer semester);
}