package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "sections")
@Entity
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Integer sizeOfSection;
    @NotNull
    private Character state;

    @NotNull
    @JsonManagedReference
    @ManyToOne//(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @NotNull
    @JsonManagedReference
    @ManyToOne//(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @JsonBackReference
    @OneToMany(mappedBy = "section", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<StudentSection> studentSections;

    @JsonBackReference
    @OneToMany(mappedBy = "section")
    private List<Attachment> attachments;

    public void addStudentSection(StudentSection studentSection){
        if(studentSections == null){
            studentSections = new ArrayList<>();
        }
        studentSections.add(studentSection);
    }

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

}
