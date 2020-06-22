package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManageStudentsSemesterDTO {

    private Integer semester;
    private List<Student> students;

}
