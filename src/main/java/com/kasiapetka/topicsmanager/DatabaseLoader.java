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
import java.util.ArrayList;
import java.util.List;

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
    private final SemesterService semesterService;

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
                          StudentService studentService, TeacherService teacherService,
                          SemesterService semesterService) {
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
        this.semesterService = semesterService;
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


        User u = new User();
        u.setEmail("admin@admin.com");
        u.setPassword(bCryptPasswordEncoder.encode("admin"));
        u.setRole(r2);
        userRepository.save(u);

        // ======================================================================
        // Semesters

        Integer year = semesterService.getCurrentYear();

        Semester semester1 = new Semester();
        semester1.setFaculty("Indica");
        semester1.setYear(year);
        semester1.setSemester(1);
        semesterRepository.save(semester1);

        Semester semester2 = new Semester();
        semester2.setFaculty("Sativa");
        semester2.setYear(year);
        semester2.setSemester(2);
        semesterRepository.save(semester2);

        Semester semester3 = new Semester();
        semester3.setFaculty("Ursynowski Domestos Haze");
        semester3.setYear(year);
        semester3.setSemester(3);
        semesterRepository.save(semester3);

        Semester semester4 = new Semester();
        semester4.setFaculty("Chemol Haze");
        semester4.setYear(year);
        semester4.setSemester(4);
        semesterRepository.save(semester4);

        Semester semester5 = new Semester();
        semester5.setFaculty("Amnezja");
        semester5.setYear(year);
        semester5.setSemester(5);
        semesterRepository.save(semester5);

        Semester semester6 = new Semester();
        semester6.setFaculty("K0S10R");
        semester6.setYear(year);
        semester6.setSemester(6);
        semesterRepository.save(semester6);

        Semester semester7 = new Semester();
        semester7.setFaculty("Lemon Super Haze");
        semester7.setYear(year);
        semester7.setSemester(7);
        semesterRepository.save(semester7);

        //Creating students for database
        NewStudentOrTeacherDTO s1 = new NewStudentOrTeacherDTO();
        s1.setNewName("student1");
        s1.setNewSurname("imastudent");
        s1.setSemester(2);
        s1.setNewEmail("aaa@aaa.com");
        s1.setNewPassword("aaaaa");

        NewStudentOrTeacherDTO s2 = new NewStudentOrTeacherDTO();
        s2.setNewName("student2");
        s2.setNewSurname("imastudenttoo");
        s2.setSemester(2);
        s2.setNewEmail("aaa@aaa2.com");
        s2.setNewPassword("aaaaa2");

        NewStudentOrTeacherDTO s3 = new NewStudentOrTeacherDTO();
        s3.setNewName("student3");
        s3.setNewSurname("afkjds");
        s3.setSemester(1);
        s3.setNewEmail("aaa@aaa3.com");
        s3.setNewPassword("aaaaa3");

        NewStudentOrTeacherDTO s4 = new NewStudentOrTeacherDTO();
        s4.setNewName("student4");
        s4.setNewSurname("ertyu");
        s4.setSemester(3);
        s4.setNewEmail("aaa@aaa4.com");
        s4.setNewPassword("aaaaa4");

        NewStudentOrTeacherDTO s5 = new NewStudentOrTeacherDTO();
        s5.setNewName("student5");
        s5.setNewSurname("ertyu");
        s5.setSemester(1);
        s5.setNewEmail("aaa@aaa5.com");
        s5.setNewPassword("aaaaa5");

        NewStudentOrTeacherDTO s6 = new NewStudentOrTeacherDTO();
        s6.setNewName("student6");
        s6.setNewSurname("ertyu");
        s6.setSemester(1);
        s6.setNewEmail("aaa@aaa6.com");
        s6.setNewPassword("aaaaa6");

        NewStudentOrTeacherDTO s7 = new NewStudentOrTeacherDTO();
        s7.setNewName("student7");
        s7.setNewSurname("ertyu");
        s7.setSemester(1);
        s7.setNewEmail("aaa@aaa7.com");
        s7.setNewPassword("aaaaa7");

        studentService.addNewStudent(s1);
        studentService.addNewStudent(s2);
        studentService.addNewStudent(s3);
        studentService.addNewStudent(s4);
        studentService.addNewStudent(s5);
        studentService.addNewStudent(s6);
        studentService.addNewStudent(s7);
        //end


        //Creating Teachers for database
        NewStudentOrTeacherDTO t1 = new NewStudentOrTeacherDTO();
        t1.setNewEmail("ttt@ttt.com");
        t1.setNewPassword("ttttt");
        t1.setNewName("Mikolaj");
        t1.setNewSurname("Kolman");

        NewStudentOrTeacherDTO t2 = new NewStudentOrTeacherDTO();
        t2.setNewEmail("ttt1@ttt1.com");
        t2.setNewPassword("ttttt");
        t2.setNewName("Mateusz");
        t2.setNewSurname("Klimas");

        NewStudentOrTeacherDTO t3 = new NewStudentOrTeacherDTO();
        t3.setNewEmail("ttt2@ttt2.com");
        t3.setNewPassword("ttttt");
        t3.setNewName("Katarzyna");
        t3.setNewSurname("Petka");

        NewStudentOrTeacherDTO t4 = new NewStudentOrTeacherDTO();
        t4.setNewEmail("ttt3@ttt3.com");
        t4.setNewPassword("ttttt");
        t4.setNewName("Kasia");
        t4.setNewSurname("Petka");

        NewStudentOrTeacherDTO t5 = new NewStudentOrTeacherDTO();
        t5.setNewEmail("ttt4@ttt4.com");
        t5.setNewPassword("ttttt");
        t5.setNewName("Janusz");
        t5.setNewSurname("Korwin-Mikke");

        NewStudentOrTeacherDTO t6 = new NewStudentOrTeacherDTO();
        t6.setNewEmail("ttt5@ttt5.com");
        t6.setNewPassword("ttttt");
        t6.setNewName("Jonathan");
        t6.setNewSurname("Joestar");

        NewStudentOrTeacherDTO t7 = new NewStudentOrTeacherDTO();
        t7.setNewEmail("ttt6@ttt6.com");
        t7.setNewPassword("ttttt");
        t7.setNewName("Naruto");
        t7.setNewSurname("Uzumaki");

        teacherService.addNewTeacher(t1);
        teacherService.addNewTeacher(t2);
        teacherService.addNewTeacher(t3);
        teacherService.addNewTeacher(t4);
        teacherService.addNewTeacher(t5);
        teacherService.addNewTeacher(t6);
        teacherService.addNewTeacher(t7);


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

        Subject subject3 = new Subject();
        subject3.setName("Maths");
        subject3.setSummary("sdfdsf");
        subjectService.addNewSubject(subject3);

        Subject subject4 = new Subject();
        subject4.setName("Mobile Technologies");
        subject4.setSummary("erertert");
        subjectService.addNewSubject(subject4);

        Subject subject5 = new Subject();
        subject5.setName("Computer Science");
        subject5.setSummary("erertert");
        subjectService.addNewSubject(subject5);

        Subject subject6 = new Subject();
        subject6.setName("Computer Graphics");
        subject6.setSummary("erertert");
        subjectService.addNewSubject(subject6);

        //end

        Topic topic = new Topic();
        topic.setName("eszkeret");
        topic.setSummary("gucci gang");
        topic.setSubject(subject);
        topicRepository.save(topic);

        Topic topic1 = new Topic();
        topic1.setName("Hibernate");
        topic1.setSummary("sdsd");
        topic1.setSubject(subject1);
        topicRepository.save(topic1);

        Topic topic2 = new Topic();
        topic2.setName("TopicTest2");
        topic2.setSummary("sdsd");
        topic2.setSubject(subject4);
        topicRepository.save(topic2);

        Topic topic3 = new Topic();
        topic3.setName("TopicTest3");
        topic3.setSummary("sdsd");
        topic3.setSubject(subject2);
        topicRepository.save(topic3);

        Topic topic4 = new Topic();
        topic4.setName("TopicTest4");
        topic4.setSummary("sdsd");
        topic4.setSubject(subject2);
        topicRepository.save(topic4);

        Topic topic5 = new Topic();
        topic5.setName("TopicTest5");
        topic5.setSummary("sdsd");
        topic5.setSubject(subject3);
        topicRepository.save(topic5);

        //Connections between entities

        Teacher teacher = teacherService.findTeacherByName("Mikolaj");
        subject.setTeachers(new ArrayList<>());
        subject.getTeachers().add(teacher);
        subjectRepository.save(subject);

        //Sections
        Section section1 = new Section();
        section1.setName("Grey59");
        section1.setSizeOfSection(2);
        section1.setState('O');
        section1.setTopic(topic);
        section1.setSemester(semester1);
        section1.setTeacher(teacher);

        StudentSection studentSection1 = new StudentSection();
        studentSection1.setSection(section1);
        studentSection1.setStudent(studentRepository.findByName("student6").orElse(new Student()));

        StudentSection studentSection2 = new StudentSection();
        studentSection2.setSection(section1);
        studentSection2.setStudent(studentRepository.findByName("student7").orElse(new Student()));

        section1.setStudentSections(new ArrayList<>());
        section1.getStudentSections().add(studentSection1);
        section1.getStudentSections().add(studentSection2);
        
        sectionRepository.save(section1);




        System.out.println("------------------------------------ DatabaseLoader ended ------------------------------------");

    }
}