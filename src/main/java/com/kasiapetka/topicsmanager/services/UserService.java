package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.DTO.EditAccount;

public interface UserService {
    User findUserByEmail(String email);
//    boolean changeEmail(User user, String newEmail);
//    void changePassword(User user, String newPassword);
    boolean checkCrudentials(String given, String actual);
    int changeCredentials(EditAccount editAccount, User user);
}
