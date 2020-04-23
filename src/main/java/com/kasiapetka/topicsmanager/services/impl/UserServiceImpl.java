package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.DTO.EditAccount;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserServiceImpl implements UserService {

    protected StudentRepository studentRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;

    @Autowired
    public UserServiceImpl(StudentRepository studentRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    private boolean changeEmail(User user, String email) {
        User temp = findUserByEmail(email);
        if (!(temp == null)) {
            System.out.println("Mail already exists");
            return false;
        }
        user.setEmail(email);
        userRepository.save(user);
        return true;
    }

    private void changePassword(User user, String password) {
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public boolean checkCrudentials(String given, String actual) {
        return bCryptPasswordEncoder.matches(given, actual);
    }

    @Override
    // returns response code
    public int changeCredentials(EditAccount editAccount, User user) {

//        if(checkCrudentials(editAccount.getNewPassword(), user.getNewPassword())){

        // newPassword changing
        if (!editAccount.getNewPassword().equals("")) {
            changePassword(user, editAccount.getNewPassword());
        }

        // mail changing
        if (!editAccount.getNewEmail().equals("")) {
            if (!changeEmail(user, editAccount.getNewEmail())) {
                // mail exists
                return 409;
            } else {
                return 201;
            }
        }

//        } else {
//            // bad newPassword given
//            return 406;
//        }

        return 200;
    }
}
