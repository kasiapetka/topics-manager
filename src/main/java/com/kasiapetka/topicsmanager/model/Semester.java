package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kasiapetka.topicsmanager.DTO.SemesterDTO;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "semesters")
@Entity
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //TODO przekminic po co jest faculty i year
    @NotNull
    private String faculty;
    @NotNull
    private Integer year;
    @NotNull
    private Integer semester;

    @JsonBackReference
    @ToString.Exclude
    @OneToMany(mappedBy = "semester")
    private List<Section> sections;

    @ToString.Exclude
    @JsonManagedReference
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name = "student_semester",
            joinColumns = @JoinColumn(name = "semester_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students;

    public void addStudent(Student student){
        if(students == null){
            students = new ArrayList<>();
        }
        students.add(student);
    }

    public SemesterDTO convertToDTO(){

        SemesterDTO semesterDTO = new SemesterDTO();
        semesterDTO.setYear(this.year);
        semesterDTO.setFaculty(this.faculty);
        semesterDTO.setSemester(this.semester);

        return semesterDTO;
    }
}
