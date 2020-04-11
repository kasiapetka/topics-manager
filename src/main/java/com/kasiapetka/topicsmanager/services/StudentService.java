package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.StudentSection;
import com.kasiapetka.topicsmanager.model.User;

import javax.transaction.Transactional;
import java.util.ArrayList;

public interface StudentService {
    Student findStudentByAlbum(Long album);
    Student findStudentByUser(User user);
//    void changeEmail(Student student, String email);
//    void changePassword(Student student, String password);
}
