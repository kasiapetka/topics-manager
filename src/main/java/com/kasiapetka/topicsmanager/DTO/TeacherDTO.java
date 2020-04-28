package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Teacher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDTO {
    private Long id;
    private Boolean isActive;
    private String name;
    private String surname;
    private UserDTO user;

    public Teacher convertToTeacher(){
        Teacher teacher = new Teacher();
        teacher.setIsActive(this.isActive);
        teacher.setId(this.id);
        teacher.setName(this.name);
        teacher.setSurname(this.surname);
        teacher.setUser(this.user.convertToUser());

        return teacher;
    }
}
