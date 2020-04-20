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
        return semesterRepository.findById(id).orElse(null);
    }

    @Override
    public Semester findSemesterBySemester(Integer semester) {
        return semesterRepository.findBySemester(semester).orElse(null);
    }
}
