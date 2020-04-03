package com.kasiapetka.topicsmanager;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.RoleRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TeacherRepository;
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
    private final TeacherRepository teacherRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,
                          TeacherRepository teacherRepository,RoleRepository roleRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.teacherRepository =teacherRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role r = new Role();
        r.setId(1L);
        r.setRoleName("Student");
        roleRepository.save(r);
        Role r1 = new Role();
        r1.setId(2L);
        r1.setRoleName("Teacher");
        roleRepository.save(r1);

        Role r2= new Role();
        r2.setId(3L);
        r2.setRoleName("Admin");
        roleRepository.save(r2);

        User u = new User();
        u.setEmail("aaa@aaa.com");
        u.setPassword(bCryptPasswordEncoder.encode("aaaaa"));
        u.setActive(1);
        u.setRole(r);
        this.userRepository.save(u);
        Student s = new Student();
        s.setName("aaaa");
        s.setSurname("bbbbbb");
        s.setUser(u);
        s.setAlbum(1000000);
        this.studentRepository.save(s);

        Student s2 = new Student();
        s2.setName("jhjjj");
        s2.setSurname("bbbbbb");
        s2.setAlbum(1111111);
        this.studentRepository.save(s2);

        Student s3 = new Student();
        s3.setName("ryyyy");
        s3.setSurname("nnnnnn");
        s3.setAlbum(2222222);
        this.studentRepository.save(s3);

        User u1 = new User();
        u1.setEmail("admin@admin.com");
        u1.setPassword(bCryptPasswordEncoder.encode("admin"));
        u1.setActive(1);
        u1.setRole(r2);
        this.userRepository.save(u1);

        User u2 = new User();
        u2.setEmail("ttt@ttt.com");
        u2.setPassword(bCryptPasswordEncoder.encode("ttttt"));
        u2.setActive(1);
        u2.setRole(r1);
        this.userRepository.save(u2);
        Teacher t = new Teacher();
        t.setName("teacher");
        t.setSurname("wersdfs");
        t.setUser(u2);
        this.teacherRepository.save(t);
    }
}