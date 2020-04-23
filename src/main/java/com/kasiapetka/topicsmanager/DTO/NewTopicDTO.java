package com.kasiapetka.topicsmanager.DTO;

import lombok.Data;

@Data
public class NewTopicDTO {
    private String name;
    private String summary;
    private Long subjectID;
}
