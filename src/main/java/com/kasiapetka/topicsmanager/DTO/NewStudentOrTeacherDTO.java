package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class NewStudentOrTeacherDTO {
    private String password;
    private String newEmail;
    private String newPassword;
    private String newName;
    private String newSurname;
    private Integer semester;
//    private Character role;
}
