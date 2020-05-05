package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findRoleByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName).orElse(new Role());

    }
}
