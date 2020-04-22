package com.kasiapetka.topicsmanager.DTO;

import lombok.Data;

@Data
public class NewStudentOrTeacherDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Integer semester;
    private Character role;
}
