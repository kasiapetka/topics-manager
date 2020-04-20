package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);
}
