package com.kasiapetka.topicsmanager;


import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.*;
import com.kasiapetka.topicsmanager.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
///import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final SemesterRepository semesterRepository;
    private final TopicRepository topicRepository;
    private final SectionRepository sectionRepository;

    private final SectionService sectionService;
    private final SubjectService subjectService;
    private final StudentService studentService;
    private final TeacherService teacherService;

    @Autowired
    private CodeService codeService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(StudentRepository studentRepository, UserRepository userRepository,
                          TeacherRepository teacherRepository,RoleRepository roleRepository,
                          SubjectRepository subjectRepository, SemesterRepository semesterRepository,
                          SectionService sectionService, TopicRepository topicRepository,
                          SectionRepository sectionRepository, SubjectService subjectService,
                          StudentService studentService, TeacherService teacherService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.semesterRepository = semesterRepository;
        this.topicRepository = topicRepository;
        this.sectionRepository = sectionRepository;
        this.studentService = studentService;

        this.sectionService = sectionService;
        this.subjectService = subjectService;
        this.teacherService = teacherService;
    }

    @Override
    public void run(String... strings) throws Exception {

//        codeService.encode("100000");
//        codeService.encode("100001");
//        codeService.encode("100002");
//        codeService.encode("100003");
//        codeService.encode("100004");
//        codeService.encode("100005");
//        codeService.encode("100006");
//        codeService.encode("100007");

//        for(int i=0;i<1000; i++){
//            int value = (int)(Math.random() * ((999999 - 100000) + 1)) + 100000;
//            codeService.encode(String.valueOf(value));
//        }

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

        // for checking albmus
        Student sa = new Student();
        sa.setName("Album");
        sa.setSurname("Album");
        sa.setAlbum(333333);
        sa.setIsActive(true);

        codeService.encode(String.valueOf(sa.getAlbum()));
        this.studentRepository.save(sa);

        User u = new User();
        u.setEmail("aaa@aaa.com");
        u.setPassword(bCryptPasswordEncoder.encode("aaaaa"));
        u.setRole(r);

       // this.userRepository.save(u);

        Student s = new Student();
        s.setName("aaaa");
        s.setSurname("bbbbbb");
        s.setUser(u);
        s.setAlbum(1000000);
        s.setIsActive(true);
        this.studentRepository.save(s);

        Student s2 = new Student();
        s2.setName("jhjjj");
        s2.setSurname("bbbbbb");
        s2.setAlbum(1111111);
        s2.setIsActive(true);
        this.studentRepository.save(s2);

        Student s3 = new Student();
        s3.setName("ryyyy");
        s3.setSurname("nnnnnn");
        s3.setAlbum(2222222);
        s3.setIsActive(true);
        this.studentRepository.save(s3);

        User u1 = new User();
        u1.setEmail("admin@admin.com");
        u1.setPassword(bCryptPasswordEncoder.encode("admin"));
        u1.setRole(r2);
        this.userRepository.save(u1);

        User u2 = new User();
        u2.setEmail("ttt@ttt.com");
        u2.setPassword(bCryptPasswordEncoder.encode("ttttt"));
        u2.setRole(r1);

//        this.userRepository.save(u2);

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


        //Testing services
        Subject subject = new Subject();
        subject.setName("Smoking dope");
        subject.setSummary("420420420");
        subjectService.addNewSubject(subject);

        Subject subject1 = new Subject();
        subject1.setName("Bazy danych");
        subject1.setSummary("wrwerwer");
        subjectService.addNewSubject(subject1);

        Subject subject2 = new Subject();
        subject2.setName("Pk2");
        subject2.setSummary("erertert");
        subjectService.addNewSubject(subject2);

        Teacher teacher = new Teacher();
        teacher.setName("Seth");
        teacher.setSurname("Rogen");
        teacher.setIsActive(true);
        teacherRepository.save(teacher);

        // ======================================================================
        // Semesters

        Integer year = Integer.valueOf(LocalDate.now().toString().split("-")[0]);

        Semester semester = new Semester();
        semester.setFaculty("Indica");
        semester.setYear(year);
        semester.setSemester(1);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("Sativa");
        semester.setYear(year);
        semester.setSemester(2);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("Ursynowski Domestos Haze");
        semester.setYear(year);
        semester.setSemester(3);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("Chemol Haze");
        semester.setYear(year);
        semester.setSemester(4);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("Amnezja");
        semester.setYear(year);
        semester.setSemester(5);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("K0S10R");
        semester.setYear(year);
        semester.setSemester(6);
        semesterRepository.save(semester);

        semester = new Semester();
        semester.setFaculty("Lemon Super Haze");
        semester.setYear(year);
        semester.setSemester(7);
        semesterRepository.save(semester);

        Topic topic = new Topic();
        topic.setName("eszkeret");
        topic.setSummary("gucci gang");
        topic.setSubject(subject);
        topic.setTeacher(teacher);
        topicRepository.save(topic);

        NewStudentOrTeacherDTO studentOrTeacherDTO = new NewStudentOrTeacherDTO();
        studentOrTeacherDTO.setName("quebonafajde");
        studentOrTeacherDTO.setSurname("lmfao");
        studentOrTeacherDTO.setSemester(1);
        studentService.addNewStudent(studentOrTeacherDTO);

        studentOrTeacherDTO.setEmail("ebe@ebe.com");
        studentOrTeacherDTO.setPassword("iksde");
        teacherService.addNewTeacher(studentOrTeacherDTO);



        //Creating a new Section
//        Section section = new Section();
//        section.setName("we the best");
//        section.setSizeOfSection(69);
//        section.setIsOpen(true);
//
//        sectionService.addNewSection(topic, semester, section);
//        //end
//
//        //Adding a new Student to Section
//        Student student = new Student();
//        student.setName("mati");
//        student.setSurname("kolmanowski");
//        student.setIsActive(true);
//        studentRepository.save(student);
//
//        Section section1 = sectionRepository.findByName("we the best");
//        Student student1 = studentRepository.findByName("mati");
//
//        sectionService.addStudentToSection(student1.getAlbum(), section1.getId());
       //end

       //end

        System.out.println("------------------------------------ DatabaseLoader ended ------------------------------------");

    }
}