package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Table(name = "students")
@Entity
public class Student {

    //@ToDo zmienic generation type na wlasny (chyba SEQUENCE to najlepiej umozliwia)
    //@ToDo stworzyc algorytm generowania kodow do rejestracji powiazanych z numerem albumu
    @Id
   // @GeneratedValue(strategy = GenerationType.AUTO)
    private long album;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private Boolean isActive;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @OneToMany(mappedBy = "student")
    private List<StudentSection> studentSection;

    @JsonBackReference
    @OneToMany(mappedBy = "student")
    private List<Attachment> attachments;

    @JsonBackReference
    @ToString.Exclude
    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<Semester> semesters;

}
