package com.kasiapetka.topicsmanager.model;

import lombok.*;
import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Character role;

    public Role() {
    }
}
