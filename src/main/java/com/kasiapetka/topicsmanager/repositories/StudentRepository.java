package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;

import javax.transaction.Transactional;

//import org.springframework.transaction.annotation.Transactional;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Student findByName(String name);
    Student findByUser(User user);
    Student findByAlbum(Long album);
}
