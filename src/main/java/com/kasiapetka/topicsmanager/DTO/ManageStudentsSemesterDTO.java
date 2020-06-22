package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManageStudentsSemesterDTO {

    private Integer semester;
    private List<StudentDTO> students;

}
