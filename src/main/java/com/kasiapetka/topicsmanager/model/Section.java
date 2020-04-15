package com.kasiapetka.topicsmanager.model;

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
    @Column(length = 1)
    private Character state;
    //ograniczenie na state - np tylko {O,C}, napewno nie dlugosc 255

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @NotNull
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @OneToMany(mappedBy = "section")
    private List<StudentSection> studentSections;

    @OneToMany(mappedBy = "section")
    private List<Attachment> attachments;

    void addAttachment(Attachment attachment){
        if(attachments == null){
            attachments = new ArrayList<>();
        }
        attachments.add(attachment);
        attachment.setSection(this);
    }

    public void addStudent(Student student){
        if(this.studentSections == null){
            this.studentSections = new ArrayList<>();
        }
        StudentSection studentSectionToAdd =  new StudentSection();
        studentSectionToAdd.setStudent(student);
        studentSectionToAdd.setSection(this);
        this.studentSections.add(studentSectionToAdd);
        student.addStudentSection(studentSectionToAdd);
    }

    public void addStudentSection(StudentSection studentSection){
        if(this.studentSections == null){
            this.studentSections = new ArrayList<>();
        }
        this.studentSections.add(studentSection);
    }

}
