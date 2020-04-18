package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Semester;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SemesterRepository extends CrudRepository<Semester, Long> {
    Optional<Semester> findBySemester(Integer semester);
}
