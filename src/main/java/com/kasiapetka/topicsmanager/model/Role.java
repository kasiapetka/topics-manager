package com.kasiapetka.topicsmanager.model;

import lombok.*;
import javax.persistence.*;
import java.util.Objects;

@Data
@Getter
@Setter
@Table(name = "roles")
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Character role;

    public Role() {
    }

    public Role(Character role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role _role = (Role) o;
        return Objects.equals(id, _role.id) &&
                Objects.equals(role, _role.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(role);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id+
                "role=" + role  + '\'' +
                '}';
    }
}
