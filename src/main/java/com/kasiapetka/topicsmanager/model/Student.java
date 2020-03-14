package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Getter
@Setter
@Table(name = "students")
@Entity
public class Student {

    //@ToDo zmienic generation type na wlasny
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long album;
    private String name;
    private String surname;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;

    //@ToDo stworzyc algorytm generowania kodow powiazanych z numerem albumu

    public Student() {
    }

    public Student(String name, String surname, User userId) {
        this.name = name;
        this.surname = surname;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(album, student.album) &&
                Objects.equals(name, student.name) &&
                Objects.equals(surname, student.surname) &&
                Objects.equals(userId, student.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(album, name, surname,userId);
    }

    @Override
    public String toString() {
        return "Student{" +
                "album=" + album +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
