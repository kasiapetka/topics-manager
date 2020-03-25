package com.kasiapetka.topicsmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
//@Table(name = "sections")
@Entity
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer sizeOfSection;
    //@todo ogarnac, zeby byla sciezka do pliku a nie blob
    private String attachment;
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

//    @OneToMany
//    @JoinColumn(name = "student_section_id")
//    private List<StudentSection> studentSection;

}
