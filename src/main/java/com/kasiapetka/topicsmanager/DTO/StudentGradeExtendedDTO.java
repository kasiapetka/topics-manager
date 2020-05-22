package com.kasiapetka.topicsmanager.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGradeExtendedDTO {
    private Long album;
    private Integer grade;
    private String name;
    private String surname;
}
