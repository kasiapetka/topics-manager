package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;

public interface UserService {
    User findUserByEmail(String email);
    boolean changeEmail(User user, String email);
    void changePassword(User user, String password);

}
