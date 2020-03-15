package com.kasiapetka.topicsmanager;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,RoleRepository roleRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role r = new Role('s');
        roleRepository.save(r);
        User u = new User("a@a.com", "aaa",1,r);
        this.userRepository.save(u);
        this.studentRepository.save(new Student("aaaa", "bbbbbb",u));
    }
}