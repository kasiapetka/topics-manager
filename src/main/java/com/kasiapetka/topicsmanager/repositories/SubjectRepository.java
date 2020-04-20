package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Subject;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SubjectRepository extends CrudRepository<Subject, Long> {
    Optional<Subject> findByName(String name);
}
