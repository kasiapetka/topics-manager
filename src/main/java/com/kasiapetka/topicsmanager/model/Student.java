package com.kasiapetka.topicsmanager.model;

import lombok.Data;

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

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "student")
    private List<StudentSection> studentSection;

    @OneToMany(mappedBy = "student")
    private List<Attachment> attachments;

    @ManyToMany(mappedBy = "students")
    private List<Semester> semesters;

}
