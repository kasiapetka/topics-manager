package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kasiapetka.topicsmanager.DTO.StudentDTO;
import lombok.ToString;
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

    @Id
    @GeneratedValue(generator = "studentID-sequence-generator")
    @GenericGenerator(
            name = "studentID-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "student_sequence"),
                    @Parameter(name = "initial_value", value = "100000"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
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

    @JsonBackReference
    @ToString.Exclude
    @OneToMany(mappedBy = "student")
    private List<StudentSection> studentSection;

    @JsonBackReference
    @OneToMany(mappedBy = "student")
    private List<Attachment> attachments;

    @JsonBackReference
    @ToString.Exclude
    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    private List<Semester> semesters;

    public StudentDTO convertToStudentDTO(){
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setUser(this.user.convertToDTO());
        studentDTO.setSurname(this.surname);
        studentDTO.setName(this.name);
        studentDTO.setAlbum(this.album);
        studentDTO.setIsActive(this.isActive);

        return studentDTO;
    }

//    public Semester getLastSemester(){
//        return semesters.get(semesters.size() - 1);
//    }
}
