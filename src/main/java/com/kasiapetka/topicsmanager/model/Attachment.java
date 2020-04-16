package com.kasiapetka.topicsmanager.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

//@todo Stworzyc dwukierunkowe settery dla wszystkich dwukierunkowych relacji

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
    private String url;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
