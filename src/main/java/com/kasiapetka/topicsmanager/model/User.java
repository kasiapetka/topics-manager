package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String email;
    private String password;
    private int active;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public User() {
    }
}
