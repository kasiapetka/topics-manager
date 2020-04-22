package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> listActiveStudents();
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
    Boolean addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO);

//    void changeEmail(Student student, String email);
//    void changePassword(Student student, String password);
    void changeName(Student student, String name);
    void changeSurname(Student student, String surname);
    Boolean deleteStudent(Long album);
}
