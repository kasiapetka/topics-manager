//package com.kasiapetka.topicsmanager;
//
//import com.kasiapetka.topicsmanager.model.Role;
//import com.kasiapetka.topicsmanager.model.Student;
//import com.kasiapetka.topicsmanager.model.Teacher;
//import com.kasiapetka.topicsmanager.model.User;
//import com.kasiapetka.topicsmanager.repositories.RoleRepository;
//import com.kasiapetka.topicsmanager.repositories.StudentRepository;
//import com.kasiapetka.topicsmanager.repositories.UserRepository;
//import org.springframework.context.ApplicationListener;
//import org.springframework.context.event.ContextRefreshedEvent;
//import org.springframework.stereotype.Component;
//
//import javax.transaction.Transactional;
//import java.util.Optional;
//
//@Component
//public class Bootstrap implements ApplicationListener<ContextRefreshedEvent> {
//
//    private final UserRepository userRepository;
//    private final StudentRepository studentRepository;
//    private final RoleRepository roleRepository;
//
//    public Bootstrap(UserRepository userRepository, StudentRepository studentRepository, RoleRepository roleRepository){
//        this.userRepository = userRepository;
//        this.studentRepository = studentRepository;
//        this.roleRepository = roleRepository;
//    }
//
//    @Override
//    @Transactional
//    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//        Role role = new Role();
//        role.setRole('s');
//
//        User user = new User();
//        user.setEmail("a@a.com");
//        user.setPassword("a");
//        user.setActive(1);
//        user.setRole(role);
//
//        Student student = new Student();
//        student.setName("a");
//        student.setSurname("ab");
//        student.setUserID(user);
//
//        roleRepository.save(role);
//        userRepository.save(user);
//        studentRepository.save(student);
//
//    }
//}