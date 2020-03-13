package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String surname;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userID;

    public Teacher() {
    }
}
