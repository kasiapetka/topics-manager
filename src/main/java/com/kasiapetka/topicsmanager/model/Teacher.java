package com.kasiapetka.topicsmanager.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "teachers")
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private Boolean isActive;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "teacher")
    private List<Topic> topics;

    @ManyToMany(mappedBy = "teachers")
    private List<Subject> subjects;

    public void addSubject(Subject subject){
        if(subjects == null){
            subjects = new ArrayList<>();
        }
        subjects.add(subject);
    }
}
