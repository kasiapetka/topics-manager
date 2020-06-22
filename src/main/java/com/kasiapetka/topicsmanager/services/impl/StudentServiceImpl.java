package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.ManageStudentsSemesterDTO;
import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.StudentSectionRepository;
import com.kasiapetka.topicsmanager.services.*;
import org.hibernate.HibernateException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@Primary
public class StudentServiceImpl implements StudentService {

    protected StudentRepository studentRepository;
    protected SemesterRepository semesterRepository; //TODO usunac
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserService userService;
    protected SemesterService semesterService;
    protected RoleService roleService;
    //    private SectionService sectionService;
    private StudentSectionRepository studentSectionRepository;
    private SectionRepository sectionRepository;

    public StudentServiceImpl(StudentRepository studentRepository, SemesterRepository semesterRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService,
                              SemesterService semesterService, RoleService roleService,
                              StudentSectionRepository studentSectionRepository, SectionRepository sectionRepository) {
        this.studentRepository = studentRepository;
        this.semesterRepository = semesterRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
        this.semesterService = semesterService;
        this.roleService = roleService;
        this.studentSectionRepository = studentSectionRepository;
        this.sectionRepository = sectionRepository;
    }

    public Section findSectionById(Long id) {
        return sectionRepository.findById(id).orElse(new Section());
    }

    public Student getLoggedStudent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        Student student = this.findStudentByUser(user);

        return student;
    }

    @Override
    public Student findStudentByAlbum(Long album) {
        return studentRepository.findById(album).orElse(null);
    }

    @Override
    public Student findStudentByUser(User user) {
        return studentRepository.findByUser(user).orElse(null);
    }

    @Override
    public List<Student> findStudentsWithoutAccount() {

        List<Student> students = new ArrayList<>();

        studentRepository.findAllByUser(null).orElse(new ArrayList<>()).iterator().forEachRemaining(students::add);

        return students;
    }

    @Override
    public void changeName(Student student, String name) {
        student.setName(name);
        studentRepository.save(student);
    }

    @Override
    public void changeSurname(Student student, String surname) {
        student.setSurname(surname);
        studentRepository.save(student);
    }

    @Override
    public Boolean deleteStudent(Long album) {
        try {
            Student student = findStudentByAlbum(album);
            student.setIsActive(false);
            studentRepository.save(student);
            return true;
        } catch (HibernateException he) {
            return false;
        }
    }

    @Override
    public List<Student> listActiveStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAllByIsActive(true).orElse(new ArrayList<>()).iterator().forEachRemaining(students::add);
        return students;
    }

    @Override
    // adding student with email???
    public Integer addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO) {

        User user = userService.findUserByEmail(studentOrTeacherDTO.getNewEmail());

        if (user != null) {
            return 409;
        }

        user = new User();
        user.setEmail(studentOrTeacherDTO.getNewEmail());
        user.setPassword(bCryptPasswordEncoder.encode(studentOrTeacherDTO.getNewPassword()));
        user.setRole(roleService.findRoleByRoleName("Student"));

        Student student = new Student();
        student.setName(studentOrTeacherDTO.getNewName());
        student.setSurname(studentOrTeacherDTO.getNewSurname());
        student.setIsActive(true);
        student.setUser(user);

        try {
            Semester semester = semesterService.findSemesterBySemesterAndYear(studentOrTeacherDTO.getSemester(),
                    semesterService.getCurrentYear());
            semester.addStudent(student);
            semesterRepository.save(semester);
            return 200;
        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }
    }

    @Override
    public Integer addNewStudentWithoutAccount(NewStudentOrTeacherDTO studentOrTeacherDTO) {

        Student student = new Student();
        student.setName(studentOrTeacherDTO.getNewName());
        student.setSurname(studentOrTeacherDTO.getNewSurname());
        student.setIsActive(true);

        try {
            Semester semester = semesterService.findSemesterBySemesterAndYear(studentOrTeacherDTO.getSemester(),
                    semesterService.getCurrentYear());
            semester.addStudent(student);
            semesterRepository.save(semester);
            return 200;
        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }
    }

    //    @Override
//    @Transactional
//    // adding student with email???
//    public Integer addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO) {
//
//        User user = userService.findUserByEmail(studentOrTeacherDTO.getNewEmail());
//
//        if(user != null){
//            return 409;
//        }
//
//        user = new User();
//        user.setEmail(studentOrTeacherDTO.getNewEmail());
//        user.setPassword(bCryptPasswordEncoder.encode(studentOrTeacherDTO.getNewPassword()));
//        user.setRole(roleService.findRoleByRoleName("Student"));
//
//        Student student = new Student();
//        student.setName(studentOrTeacherDTO.getNewName());
//        student.setSurname(studentOrTeacherDTO.getNewSurname());
//        student.setIsActive(true);
//        student.setUser(user);
//
//        try {
//            Semester semester = semesterService.findSemesterBySemesterAndYear(studentOrTeacherDTO.getSemester(),
//                    Integer.valueOf(LocalDate.now().toString().split("-")[0]));
//            semester.addStudent(student);
//            semesterRepository.save(semester);
//            return 200;
//        } catch (HibernateException he) {
//            he.printStackTrace();
//            return 500;
//        }
//    }

    @Override
    public List<Student> listActiveStudentsBySemester(Integer semesterNumber) {
        List<Student> studentList = this.listActiveStudents();
        List<Student> studentsFromThisSemester = new ArrayList<>();
        for (Student student : studentList) {
            List<Semester> semesterList = student.getSemesters();
            for (Semester semester : semesterList) {
                if ((semester.getSemester() == semesterNumber) &&
                        (semester.getYear().equals(semesterService.getCurrentYear()))) {
                    studentsFromThisSemester.add(student);
                }
            }
        }
        return studentsFromThisSemester;
    }

    @Override
    public Boolean isLoggedStudentInSection(Long sectionId) {

        Section section = this.findSectionById(sectionId);

        Student student = this.getLoggedStudent();

        for (StudentSection s : section.getStudentSections()) {
            if (s.getStudent().getAlbum().equals(student.getAlbum())) {
                return true;
            }
        }

        return false;
    }

    @Override
    public List<Section> listLoggedStudentSections() {

        Student student = this.getLoggedStudent();

        List<StudentSection> studentSections = new ArrayList<>();
        studentSectionRepository.findAllByStudent(student).orElse(new ArrayList<>()).iterator().forEachRemaining(studentSections::add);

        List<Section> sections = new ArrayList<>();

        for (StudentSection studentSection : studentSections) {
            if (!sections.contains(studentSection.getSection())) {
                sections.add(studentSection.getSection());
            }
        }

        return sections;
    }

    @Override
    public Integer joinSection(Long sectionId) {

        Student student = this.getLoggedStudent();

        Section section = this.findSectionById(sectionId);

        List<StudentSection> studentSections = section.getStudentSections();

        Section isPresent = this.checkJoin(student.getAlbum(), sectionId);
        if(isPresent != null){
            this.leaveSection(isPresent.getId());
        }

        StudentSection studentSection = studentSectionRepository.findBySectionAndStudent(section, student).orElse(null);

        if (!studentSections.contains(studentSection)) {
            if (!(section.getSizeOfSection() <= (section.getStudentSections().size()))) {
                if (section.getState().equals('O')) {
                    StudentSection s = new StudentSection();
                    s.setStudent(student);
                    s.setSection(section);

                    try {
                        studentSectionRepository.save(s);
                    } catch (HibernateException e) {
                        e.printStackTrace();
                        return 500;
                    }
                }
            }
            return 200;

        } else {
            return 500;
        }
    }

    @Override
    public Integer leaveSection(Long sectionId) {

        Student student = this.getLoggedStudent();

        Section section = this.findSectionById(sectionId);

        List<StudentSection> studentSections = section.getStudentSections();

        StudentSection studentSection = studentSectionRepository.findBySectionAndStudent(section, student).orElse(null);

        if (studentSections.contains(studentSection)) {
            studentSections.remove(studentSection);
            section.setStudentSections(studentSections);

            try {
                studentSectionRepository.delete(studentSection);
                sectionRepository.save(section);
            } catch (HibernateException e) {
                e.printStackTrace();
                return 500;
            }

            return 200;
        } else {
            return 500;
        }
    }

    @Override
    public Section checkJoin(Long studentID, Long sectionID) {
        List<StudentSection> studentSectionList = this.findStudentByAlbum(studentID).getStudentSection();
        Section section = this.findSectionById(sectionID);

        for (StudentSection studentSection : studentSectionList) {
            if (studentSection.getSection().getTopic().getSubject().equals(section.getTopic().getSubject())) {
                return studentSection.getSection();
            }
        }

        return null;
    }

    @Override
    public Integer addSemesterToStudents(ManageStudentsSemesterDTO manageStudentsSemesterDTO) {

        List<Student> students = manageStudentsSemesterDTO.getStudents();

        if(manageStudentsSemesterDTO.getSemester() >= 7){
            return 500;
        }

        Semester semester = semesterService.findSemesterBySemesterAndYear(manageStudentsSemesterDTO.getSemester()+1,
                                            semesterService.getCurrentYear());

        for(Student student : students){
            student.getSemesters().add(semester);
        }

        try{
            studentRepository.saveAll(students);
        } catch (HibernateException e){
            e.printStackTrace();
            return 500;
        }

        return 200;
    }
}

