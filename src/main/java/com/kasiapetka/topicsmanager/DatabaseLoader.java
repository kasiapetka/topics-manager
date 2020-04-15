package com.kasiapetka.topicsmanager;

import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.*;
import com.kasiapetka.topicsmanager.services.AdminService;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.SubjectService;
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
    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;

    private final StudentService studentService;
    private final SectionService sectionService;
    private final AdminService adminService;
    private final SubjectService subjectService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,
                          TeacherRepository teacherRepository,RoleRepository roleRepository,
                          SectionRepository sectionRepository, StudentSectionRepository studentSectionRepository,
                          StudentService studentService, SectionService sectionService,
                          SubjectRepository subjectRepository, AdminService adminService,
                          SubjectService subjectService, TopicRepository topicRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.teacherRepository = teacherRepository;
        this.sectionRepository = sectionRepository;
        this.studentSectionRepository = studentSectionRepository;
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;

        this.studentService = studentService;
        this.sectionService = sectionService;
        this.adminService = adminService;
        this.subjectService = subjectService;
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
        u.setRole(r);
        u.setIsActive(true);
        //this.userRepository.save(u);
        Student s = new Student();
        s.setName("aaaa");
        s.setSurname("bbbbbb");
        s.setUser(u);
        s.setAlbum(1000000L);
        s.setIsActive(true);
        this.studentRepository.save(s);

        Student s2 = new Student();
        s2.setName("jhjjj");
        s2.setSurname("bbbbbb");
        s2.setAlbum(1111111L);
        s2.setIsActive(true);
        this.studentRepository.save(s2);

        Student s3 = new Student();
        s3.setName("ryyyy");
        s3.setSurname("nnnnnn");
        s3.setAlbum(2222222L);
        s3.setIsActive(true);
        this.studentRepository.save(s3);

        User u1 = new User();
        u1.setEmail("admin@admin.com");
        u1.setPassword(bCryptPasswordEncoder.encode("admin"));
        u1.setRole(r2);
        u1.setIsActive(true);
        this.userRepository.save(u1);

        User u2 = new User();
        u2.setEmail("ttt@ttt.com");
        u2.setPassword(bCryptPasswordEncoder.encode("ttttt"));
        u2.setRole(r1);
        u2.setIsActive(true);
        //this.userRepository.save(u2);
        Teacher t = new Teacher();
        t.setName("teacher");
        t.setSurname("wersdfs");
        t.setUser(u2);
        t.setIsActive(true);
        this.teacherRepository.save(t);

        Teacher t1 = new Teacher();
        t1.setName("mateusz");
        t1.setSurname("klimas");
        t1.setIsActive(true);
        this.teacherRepository.save(t1);

        Teacher t2 = new Teacher();
        t2.setName("kasia");
        t2.setSurname("petka");
        t2.setIsActive(true);
        this.teacherRepository.save(t2);

        Teacher t3 = new Teacher();
        t3.setName("mikolaj");
        t3.setSurname("kolman");
        t3.setIsActive(true);
        this.teacherRepository.save(t3);

        //Testing entities
        Student student =  new Student();
        student.setAlbum(420L);
        student.setName("snoop");
        student.setSurname("dogg");
        student.setIsActive(true);
        this.studentRepository.save(student);

        Semester semester = new Semester();
        semester.setFaculty("smoking dope");
        semester.setYear(2121);
        semester.setSemester(1);

        Section section = new Section();
        section.setName("blazers");
        section.setSizeOfSection(69);
        section.setState('O');
        section.setSemester(semester);
        this.sectionRepository.save(section);

        Subject subject = new Subject();
        subject.setName("growing pot");
        subject.setSummary("you will learn how to grow the best pot");
        subjectService.createSubject(subject);

        Teacher teacher = new Teacher();
        teacher.setName("Wiz");
        teacher.setSurname("Khalifa");
        teacher.setIsActive(true);
        teacherRepository.save(teacher);

        Topic topic = new Topic();
        topic.setName("indica");
        topic.setSummary("blazeit");
        topicRepository.save(topic);

        //end

        //Adding Student to a Section test
        Student student1 = studentRepository.findByName("snoop");
        Section section1 = sectionRepository.findByName("blazers");
        sectionService.addStudentToSection(student1, section1);
        //end

        //Creating a Subject and adding a Teacher to it
        Subject subject1 = subjectRepository.findByName("growing pot");
        Teacher teacher1 = teacherRepository.findByName("Wiz");
        subjectService.addTeacherToSubject(teacher1, subject1);
        //end

        //Adding a Topic to a Subject
        subject1 = subjectRepository.findByName("growing pot");
        Topic topic1 = topicRepository.findByName("indica");
        subjectService.addTopicToSubject(topic1, subject1);
        //end

        //Createing a new section
        sectionService.addNewSection(section1, semester, topic);
        //end

        //Deleting a Student
        student1 = studentRepository.findByName("snoop");
        studentService.deleteStudent(student1.getAlbum());
        //end

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