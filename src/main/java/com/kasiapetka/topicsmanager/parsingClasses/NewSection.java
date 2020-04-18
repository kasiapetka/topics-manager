package com.kasiapetka.topicsmanager.parsingClasses;

import lombok.Data;

@Data
public class NewSection {
    private String name;
    private Integer size;
    private Boolean state; //zmienic na isOpen
    private Integer semester;
    private Long topic; //zmienic na topicId
}
