package com.kasiapetka.topicsmanager.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

//TODO Stworzyc dwukierunkowe settery dla wszystkich dwukierunkowych relacji
//TODO Typo z BD chyba chcial, zebysmy ograniczyli dlugosc niektorych varcharow @Column(length = n)
//TODO Dodac tez unique do niektorych kolumn np. mail

@Data
@Table(name = "attachments")
@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String description;
    @NotNull
    @Column(unique = true)
    private String url;

    @NotNull
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "section_id")
    private Section section;

    @NotNull
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "student_id")
    private Student student;

}
