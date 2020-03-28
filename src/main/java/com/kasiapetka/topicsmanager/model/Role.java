package com.kasiapetka.topicsmanager.model;

import lombok.Data;
import javax.persistence.*;

@Data
@Table(name = "roles")
@Entity
public class Role {

    @Id
    private Long id;
    private String roleName;

    public Role() {
    }

}
