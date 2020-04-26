package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;

public interface StudentService {
    List<Student> listActiveStudents();
    List<Student> listActiveStudentsBySemester(Integer semester_number);
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
    Integer addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO);

//    void changeEmail(Student student, String newEmail);
//    void changePassword(Student student, String newPassword);
    void changeName(Student student, String name);
    void changeSurname(Student student, String surname);
    Boolean deleteStudent(Long album);
}
