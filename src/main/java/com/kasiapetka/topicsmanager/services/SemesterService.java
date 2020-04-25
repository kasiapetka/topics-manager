package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Semester;

public interface SemesterService {
    Semester findSemesterById(Long id);
    Semester findSemesterBySemester(Integer semester);
    Semester findSemesterBySemesterAndYear(Integer semester, Integer year);
    Integer getCurrentYear();
}
