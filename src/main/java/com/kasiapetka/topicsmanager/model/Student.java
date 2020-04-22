package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

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
    @GeneratedValue(generator = "sequence-generator")
    @GenericGenerator(
            name = "sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "student_sequence"),
                    @Parameter(name = "initial_value", value = "100000"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
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
    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<Semester> semesters;

}
