//package com.kasiapetka.topicsmanager.config;
//
//import com.kasiapetka.topicsmanager.model.User;
//import com.kasiapetka.topicsmanager.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class JpaUserDetailsService implements UserDetailsService {
//
//    private final UserRepository repository;
//   // private final StudentRepository repository;
//   // private final StudentRepository repository;
//
//    @Autowired
//    public JpaUserDetailsService(UserRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        User u = this.repository.findByEmail(email);
//        List l = new ArrayList();
//        l.add(u.getRole().getRole().toString());
//
//        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPassword(),l);
//    }
//}