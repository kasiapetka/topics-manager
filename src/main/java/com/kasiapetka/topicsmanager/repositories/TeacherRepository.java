package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
    Optional<Teacher> findByUser(User user);
    Optional<List<Teacher>> findAllByIsActive(Boolean isActive);
    //Optional<List<Teacher>> findAllByIsActiveAndSubjects(Boolean isActive, Long subjectId);
}
