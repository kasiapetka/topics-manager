//package com.kasiapetka.topicsmanager.config;
//
//
//import com.kasiapetka.topicsmanager.model.User;
//import com.kasiapetka.topicsmanager.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Optional;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Override
//    @Transactional
//    public UserDetails loadUserByUsername(String email)
//            throws UsernameNotFoundException {
//        // Let people login with either username or email
//        User user = userRepository.findByEmail(email);
//
//        return UserPrincipal.create(user);
//    }
//
//    @Transactional
//    public UserDetails loadUserById(Long id) {
//        Optional<User> user = userRepository.findById(id);
//
//        return UserPrincipal.create(user);
//    }
//}