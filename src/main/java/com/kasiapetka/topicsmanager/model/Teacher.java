package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kasiapetka.topicsmanager.DTO.TeacherDTO;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Table(name = "teachers")
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private Boolean isActive;

    @JsonManagedReference
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @OneToMany(mappedBy = "teacher")
    private List<Topic> topics;

    @JsonBackReference
    @ToString.Exclude
    @ManyToMany(mappedBy = "teachers")
    private List<Subject> subjects;

    @JsonBackReference
    @ToString.Exclude
    @OneToMany(mappedBy = "teacher")
    private List<Section> sections;

    public TeacherDTO convertToDTO(){
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.setUser(this.user.convertToDTO());
        teacherDTO.setSurname(this.surname);
        teacherDTO.setName(this.name);
        teacherDTO.setIsActive(this.isActive);

        return teacherDTO;
    }
}
