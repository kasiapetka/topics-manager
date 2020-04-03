package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;

public interface UserService {
    User findUserByEmail(String email);
}
