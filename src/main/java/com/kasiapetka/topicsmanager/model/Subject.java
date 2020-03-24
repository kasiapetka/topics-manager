package com.kasiapetka.topicsmanager.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Data
@Getter
@Setter
@Table(name = "subjects")
@Entity
public class Subject {
    @Id
    private long id;
    private String name;
    private String summary;
    private Character state;

    @ManyToMany
    @JoinTable(
            name = "subject_teacher",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private List<Teacher> subjects;
}
