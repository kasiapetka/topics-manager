package com.kasiapetka.topicsmanager;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
///import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,RoleRepository roleRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role r = new Role();
        r.setId(1L);
        r.setRoleName("Student");
        User u = new User();
        u.setEmail("aaa@aaa.com");
        u.setPassword(bCryptPasswordEncoder.encode("aaaaa"));
        u.setActive(1);
        u.setRole(r);
        Student s = new Student();
        s.setName("aaaa");
        s.setSurname("bbbbbb");
        s.setUser(u);
        this.studentRepository.save(s);

//        SecurityContextHolder.getContext().setAuthentication(
//                new UsernamePasswordAuthenticationToken("aaa", "doesn't matter",
//                        AuthorityUtils.createAuthorityList("s")));
//
//        SecurityContextHolder.clearContext();
    }
}