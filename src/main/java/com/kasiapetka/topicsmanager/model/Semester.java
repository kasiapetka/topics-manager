package com.kasiapetka.topicsmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Getter
@Setter
@Table(name = "semesters")
@Entity
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String faculty;
    private Integer year;
    private Integer semester;

    @OneToMany(mappedBy = "semester")
    @JoinColumn(name = "section_id")
    private List<Section> sections;

    @ManyToMany
    @JoinTable(
            name = "student_semester",
            joinColumns = @JoinColumn(name = "semester_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students;
}
