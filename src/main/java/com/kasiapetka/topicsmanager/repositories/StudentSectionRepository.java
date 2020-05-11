package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.StudentSection;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentSectionRepository extends CrudRepository<StudentSection, Long> {
    Optional<List<StudentSection>> findAllBySection(Section section);
    Optional<List<StudentSection>> findAllByStudent(Student student);
    Optional<StudentSection> findBySectionAndStudent(Section section, Student student);
}
