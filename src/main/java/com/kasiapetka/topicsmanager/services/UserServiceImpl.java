package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserServiceImpl implements UserService{

    protected StudentRepository studentRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;

    @Autowired
    public UserServiceImpl(StudentRepository studentRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder,UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean changeEmail(User user, String email) {
        User temp = findUserByEmail(email);
        if(!(temp == null)){
            System.out.println("Mail already exists");
            return false;
        }
        user.setEmail(email);
        userRepository.save(user);
        return true;
    }

    @Override
    public void changePassword(User user, String password) {
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
    }

}
