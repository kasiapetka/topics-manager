package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.StudentSection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSectionRepository extends CrudRepository<StudentSection, Long> {
    List<StudentSection> findAllByStudent(Student student);
}
