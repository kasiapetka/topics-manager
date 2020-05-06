package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private Long album;
    private Boolean isActive;
    private String name;
    private String surname;
    private UserDTO user;

    public StudentDTO convertToStudentDTO(Student student){
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setAlbum(student.getAlbum());
        studentDTO.setName(student.getName());
        studentDTO.setIsActive(student.getIsActive());
        studentDTO.setSurname(student.getSurname());
        studentDTO.setUser(student.getUser().convertToDTO());

        return studentDTO;
    }
}
