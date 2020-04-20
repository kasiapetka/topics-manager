package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    protected UserService userService;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userService.findUserByEmail(userName);
        List roles = new ArrayList<Role>();
        roles.add(user.getRole());
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), new ArrayList<>());
    }
}
