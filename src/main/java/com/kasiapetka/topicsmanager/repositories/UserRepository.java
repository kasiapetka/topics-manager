package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
