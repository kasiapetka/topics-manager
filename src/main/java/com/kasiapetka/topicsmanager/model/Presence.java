package com.kasiapetka.topicsmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kasiapetka.topicsmanager.DTO.PresenceDTO;
import lombok.Data;

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

    @JsonManagedReference
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "student_section_id")
    private StudentSection studentSection;

    public PresenceDTO convertToDTO(){
        PresenceDTO presenceDTO = new PresenceDTO();
        presenceDTO.setDate(this.date);
        presenceDTO.setId(this.id);
        presenceDTO.setIsPresent(this.isPresent);

        return presenceDTO;
    }
}
