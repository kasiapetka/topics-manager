package com.kasiapetka.topicsmanager.model;

import com.kasiapetka.topicsmanager.DTO.UserDTO;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Table(name="users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private String email;
    @NotNull
    private String password;


    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UserDTO convertToDTO(){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(this.id);
        userDTO.setEmail(this.email);
        //@TODO same with password
        userDTO.setPassword(this.getPassword());
        userDTO.setRole(this.role);

        return userDTO;
    }
}
