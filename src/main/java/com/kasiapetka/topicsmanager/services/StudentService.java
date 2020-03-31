package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Student;

import java.util.Optional;

public interface StudentService {
    Student findStudentByAlbum(Long album);
    void save(Student Student);
}
