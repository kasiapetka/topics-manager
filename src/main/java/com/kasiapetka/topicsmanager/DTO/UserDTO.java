package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Role;
import com.kasiapetka.topicsmanager.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String email;
    private Long id;
    //todo refactor to not send password
    private String password;
    private Role role;

    public User convertToUser(){
        User user = new User();
        user.setEmail(this.email);
        user.setPassword(this.password);
        user.setId(this.id);
        user.setRole(this.role);

        return user;
    }
}
