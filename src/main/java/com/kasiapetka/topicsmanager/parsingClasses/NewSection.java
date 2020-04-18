package com.kasiapetka.topicsmanager.parsingClasses;

import lombok.Data;

@Data
public class NewSection {
    private String name;
    private Integer size;
    private Integer semester;
    private Long topicId;
}
