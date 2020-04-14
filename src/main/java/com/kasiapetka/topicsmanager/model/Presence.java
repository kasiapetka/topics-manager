package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
@Table(name = "presence")
@Entity
public class Presence {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private Date date;
    @NotNull
    private Boolean isPresent;

    @NotNull
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "student_section_id")
    private StudentSection studentSection;

    public Presence() {
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Presence;
    }

}
