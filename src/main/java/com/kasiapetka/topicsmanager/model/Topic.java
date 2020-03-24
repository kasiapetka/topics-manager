package com.kasiapetka.topicsmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Table(name = "topic")
@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String summary;
    private Character state;

//    @OneToMany
//    @JoinColumn(name = "section_id")
    //private List<Section> sections;
}
