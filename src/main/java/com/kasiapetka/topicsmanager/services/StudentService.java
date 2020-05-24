package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;

public interface StudentService {
    List<Student> listActiveStudents();
    List<Student> listActiveStudentsBySemester(Integer semesterNumber);
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
    Integer addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO);
    Boolean isLoggedStudentInSection(Long sectionId);
    List<Section> listLoggedStudentSections();
    Student getLoggedStudent();

//    void changeEmail(Student student, String newEmail);
//    void changePassword(Student student, String newPassword);
    Integer joinSection(Long sectionId);
    Integer leaveSection(Long sectionId);
    Boolean checkJoin(Long studentID, Long sectionID);
    void changeName(Student student, String name);
    void changeSurname(Student student, String surname);
    Boolean deleteStudent(Long album);
}
