package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.AdminRepository;

import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Primary
public class AdminServiceImpl implements AdminService{

    protected UserRepository userRepository;
    protected AdminRepository adminRepository;
    protected BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void changePassword(User admin, String password) {
        admin.setPassword(bCryptPasswordEncoder.encode(password));
        adminRepository.save(admin);
    }
}
