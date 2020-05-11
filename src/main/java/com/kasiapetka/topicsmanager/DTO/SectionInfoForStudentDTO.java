package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Presence;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionInfoForStudentDTO {

    private Long sectionId;
    private String sectionName;
    private Integer sectionSize;
    private Character sectionState;

    private String teacherName;
    private String teacherSurname;
    private String teacherEmail;

    private Boolean inSection;

    private String subjectName;
    private String topicName;

    private SemesterDTO semester;

    List<StudentDTO> students;

    List<Presence> presences;
    private Date date;
    private Integer grade;
}
