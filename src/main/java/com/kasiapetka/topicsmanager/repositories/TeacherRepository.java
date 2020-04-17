package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
    Teacher findByUser(User user);
    Teacher findByName(String name);
    List<Teacher> findAllByIsActive(Boolean isActive);
}
