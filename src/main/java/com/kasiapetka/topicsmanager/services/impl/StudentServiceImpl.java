package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.NewStudentOrTeacherDTO;
import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.SemesterService;
import com.kasiapetka.topicsmanager.services.StudentService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Primary
public class StudentServiceImpl implements StudentService {

    protected StudentRepository studentRepository;
    protected SemesterRepository semesterRepository; //TODO usunac
    protected BCryptPasswordEncoder bCryptPasswordEncoder;
    protected UserRepository userRepository;

    protected SemesterService semesterService;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, SemesterService semesterService,
                            BCryptPasswordEncoder bCryptPasswordEncoder,UserRepository userRepository,
                              SemesterRepository semesterRepository) {
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.semesterRepository = semesterRepository;

        this.semesterService = semesterService;
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
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    public List<Student> listActiveStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAllByIsActive(true).orElse(new ArrayList<>()).iterator().forEachRemaining(students::add);
        return students;
    }

    //TODO moze to zrefactorowac?
    @Override
    @Transactional
    public Boolean addNewStudent(NewStudentOrTeacherDTO studentOrTeacherDTO) {
        Student student = new Student();
        student.setName(studentOrTeacherDTO.getName());
        student.setSurname(studentOrTeacherDTO.getSurname());
        student.setIsActive(true);
        try {
            Semester semester = semesterService.findSemesterBySemesterAndYear(studentOrTeacherDTO.getSemester(),
                    Integer.valueOf(LocalDate.now().toString().split("-")[0]));
            semester.addStudent(student);
            semesterRepository.save(semester);
            return true;
        } catch (HibernateException he){
            he.printStackTrace();
            return false;
        }
    }

}
