package com.kasiapetka.topicsmanager.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Getter
@Setter
@Table(name="users")
@Entity
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

    public User(String email, String password, int active, Role role) {
        this.email = email;
        this.password = password;
        this.active = active;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password) &&
                Objects.equals(active, user.active) &&
                Objects.equals(role, user.role);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, email, password, active,role);
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", active='" + active + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
