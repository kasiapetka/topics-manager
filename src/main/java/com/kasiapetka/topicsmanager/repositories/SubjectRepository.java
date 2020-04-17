package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Subject;
import org.springframework.data.repository.CrudRepository;

public interface SubjectRepository extends CrudRepository<Subject, Long> {
    Subject findByName(String name);
}
