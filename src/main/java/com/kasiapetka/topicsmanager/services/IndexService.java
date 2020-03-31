package com.kasiapetka.topicsmanager.services;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;

public interface IndexService {
    User findUserByEmail(String email);
    void create(User user, Student student);
}
