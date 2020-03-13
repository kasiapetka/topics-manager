package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "students")
public class Student {

    //@ToDo zmienic generation type na wlasny
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long album;
    private String name;
    private String surname;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userID;

    //@ToDo stworzyc algorytm generowania kodow powiazanych z numerem albumu

    public Student() {
    }
}
