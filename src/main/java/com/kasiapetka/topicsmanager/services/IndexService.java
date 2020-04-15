package com.kasiapetka.topicsmanager.services;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.RegisterForm;

public interface IndexService {
    User findUserByEmail(String email);
    void create(User user, Student student);
    int createStudent(RegisterForm newStudent);
}
