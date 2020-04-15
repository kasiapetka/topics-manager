package com.kasiapetka.topicsmanager.model;

import lombok.*;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "students")
@Entity
public class Student {

    //@ToDo zmienic generation type na wlasny (chyba SEQUENCE to najlepiej umozliwia)
    //@ToDo stworzyc algorytm generowania kodow do rejestracji powiazanych z numerem albumu
    @Id
   // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long album;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private Boolean isActive;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "student", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<StudentSection> studentSections;

    @OneToMany(mappedBy = "student", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<Attachment> attachments;

    @ManyToMany(mappedBy = "students")
    private List<Semester> semesters;

    void addStudentSection(StudentSection studentSection){
        if(this.studentSections == null){
            this.studentSections = new ArrayList<>();
        }
        this.studentSections.add(studentSection);
    }

    public void addAttachment(Attachment attachment, Section section){
        if(attachments == null){
            attachments = new ArrayList<>();
        }
        this.attachments.add(attachment);
        attachment.setStudent(this);
        section.addAttachment(attachment);
    }

}
