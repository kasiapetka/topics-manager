package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.services.RoleService;
import com.kasiapetka.topicsmanager.services.SemesterService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.hibernate.HibernateException;
import org.springframework.context.annotation.Primary;
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

    public StudentServiceImpl(StudentRepository studentRepository, SemesterRepository semesterRepository,
                              BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService,
                              SemesterService semesterService, RoleService roleService) {
        this.studentRepository = studentRepository;
        this.semesterRepository = semesterRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
        this.semesterService = semesterService;
        this.roleService = roleService;
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

//        User user = userService.findUserByEmail(studentOrTeacherDTO.getNewEmail());
//
//        if(user != null){
//            return 409;
//        }

//        user = new User();
//        user.setEmail(studentOrTeacherDTO.getNewEmail());
//        user.setPassword(bCryptPasswordEncoder.encode(studentOrTeacherDTO.getNewPassword()));
//        user.setRole(roleService.findRoleByRoleName("Student"));

        Student student = new Student();
        student.setName(studentOrTeacherDTO.getNewName());
        student.setSurname(studentOrTeacherDTO.getNewSurname());
        student.setIsActive(true);
//        student.setUser(user);/

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
        for(Student student : studentList){
            List<Semester> semesterList = student.getSemesters();
            for(Semester semester : semesterList){
                if((semester.getSemester() == semesterNumber) &&
                        (semester.getYear().equals(semesterService.getCurrentYear()))){
                    studentsFromThisSemester.add(student);
                }
            }
        }
        return studentsFromThisSemester;
    }
}

