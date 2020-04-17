package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;

public interface UserService {
    User findUserByEmail(String email);
//    boolean changeEmail(User user, String email);
//    void changePassword(User user, String password);
    boolean checkCrudentials(String given, String actual);
    int changeCredentials(EditAccount editAccount, User user);
}
