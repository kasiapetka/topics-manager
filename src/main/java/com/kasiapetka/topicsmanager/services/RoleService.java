package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Role;


public interface RoleService {
    Role findRoleByRoleName(String roleName);
}
