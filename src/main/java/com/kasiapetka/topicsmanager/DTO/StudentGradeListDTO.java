package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGradeListDTO {

    private Date date;
    private List<StudentGradeDTO> students;
}
