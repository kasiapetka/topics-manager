package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Data
@Table(name = "student_section")
@Entity
public class StudentSection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer grade;
    //@TODO think if this is date for grade only???
    private Date date;

    @NotNull
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @NotNull
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

    @OneToMany(mappedBy = "studentSection")
    private List<Presence> presences;

}
