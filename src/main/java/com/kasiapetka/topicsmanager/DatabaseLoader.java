package com.kasiapetka.topicsmanager;

import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.*;
import com.kasiapetka.topicsmanager.services.StudentService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
    private final SectionRepository sectionRepository;
    private final StudentSectionRepository studentSectionRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,
                          TeacherRepository teacherRepository,RoleRepository roleRepository,
                            SectionRepository sectionRepository, StudentSectionRepository studentSectionRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.teacherRepository = teacherRepository;
        this.sectionRepository = sectionRepository;
        this.studentSectionRepository = studentSectionRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Role r = new Role();
        r.setId(1L);
        r.setRoleName("Student");
        //roleRepository.save(r);
        Role r1 = new Role();
        r1.setId(2L);
        r1.setRoleName("Teacher");
        //roleRepository.save(r1);

        Role r2= new Role();
        r2.setId(3L);
        r2.setRoleName("Admin");
        //roleRepository.save(r2);

        User u = new User();
        u.setEmail("aaa@aaa.com");
        u.setPassword(bCryptPasswordEncoder.encode("aaaaa"));
        u.setActive(1);
        u.setRole(r);
        //this.userRepository.save(u);
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
        //this.userRepository.save(u2);
        Teacher t = new Teacher();
        t.setName("teacher");
        t.setSurname("wersdfs");
        t.setUser(u2);
        this.teacherRepository.save(t);

        Teacher t1 = new Teacher();
        t1.setName("mateusz");
        t1.setSurname("klimas");
        this.teacherRepository.save(t1);

        Teacher t2 = new Teacher();
        t2.setName("kasia");
        t2.setSurname("petka");
        this.teacherRepository.save(t2);

        Teacher t3 = new Teacher();
        t3.setName("mikolaj");
        t3.setSurname("kolman");
        this.teacherRepository.save(t3);

        //Testing entities
        Student student =  new Student();
        student.setAlbum(420L);
        student.setName("snoop");
        student.setSurname("dogg");
        this.studentRepository.save(student);

        Section section = new Section();
        section.setName("blazers");
        section.setSizeOfSection(69);
        section.setIsActive(true);
        this.sectionRepository.save(section);

        //end
        //Adding Student to a Section test
        Student student1 = studentRepository.findByName("snoop");
        //student1.setStudentSections(this.studentSectionRepository.findAllByStudent(student1));
        Section section1 = sectionRepository.findByName("blazers");
        //section1.setStudentSections(this.studentSectionRepository.findAllByStudent(student1));
        //student1.addSection(section1);
        student1.addSection(section1);
        this.studentRepository.save(student1);
        //end test

        //Student Section Attachment test
//        Student student1 = studentRepository.findByName("snoop");
//        Section section1 = sectionRepository.findByName("blazers");

//        Attachment attachment = new Attachment();
//        attachment.setDescription("we blazein dope out here");
//        attachment.setUrl("nopolice");
//        student.addAttachment(attachment, section);
//        this.studentRepository.save(student);
        //end test
    }
}