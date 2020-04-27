package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Teacher;
import lombok.Data;

import java.util.List;

@Data
public class TeacherListDTO {
    List<Teacher> teachers;
}
