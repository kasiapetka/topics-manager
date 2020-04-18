package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SemesterServiceImpl implements SemesterService {
    private SemesterRepository semesterRepository;

    @Autowired
    public SemesterServiceImpl(SemesterRepository semesterRepository){
        this.semesterRepository = semesterRepository;
    }

    @Override
    public Semester findSemesterById(Long id) {
        Optional<Semester> semesterOptional = semesterRepository.findById(id);
        if(!semesterOptional.isPresent()){
            return null;
        }
        return semesterOptional.get();
    }

    @Override
    public Semester findSemesterBySemester(Integer semester) {
        Optional<Semester> semesterOptional = semesterRepository.findBySemester(semester);
        if(!semesterOptional.isPresent()){
            return null;
        }
        return semesterOptional.get();
    }
}
