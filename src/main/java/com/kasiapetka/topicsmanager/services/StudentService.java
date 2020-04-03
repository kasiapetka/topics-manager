package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

import java.util.Optional;

public interface StudentService {
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
    void changeEmail(Student student, String email);
    void changePassword(Student student, String password);
}
