package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

public interface StudentService {
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
//    void changeEmail(Student student, String email);
//    void changePassword(Student student, String password);
    void changeName(Student student, String name);
    void changeSurname(Student student, String surname);
}
