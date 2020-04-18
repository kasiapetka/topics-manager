package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Student findByName(String name);
    Student findByUser(User user);
    List<Student> findAllByIsActive(Boolean isActive);
}
