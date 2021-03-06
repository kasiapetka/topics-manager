package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.Semester;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Transactional
@Service
public class SemesterServiceImpl implements SemesterService {
    private SemesterRepository semesterRepository;

    @Autowired
    public SemesterServiceImpl(SemesterRepository semesterRepository) {
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

    @Override
    public Semester findSemesterBySemesterAndYear(Integer semester, Integer year) {
        return semesterRepository.findBySemesterAndYear(semester, year).orElse(null);
    }

    @Override
    public Integer getCurrentYear() {
        return Integer.valueOf(LocalDate.now().toString().split("-")[0]);
    }
}
