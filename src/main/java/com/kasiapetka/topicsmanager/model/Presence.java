package com.kasiapetka.topicsmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Getter
@Setter
@Table(name = "presence")
@Entity
public class Presence {
    @Id
    private Long id;
    private Date date;
    private Boolean isPresent;
}
