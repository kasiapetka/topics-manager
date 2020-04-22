package com.kasiapetka.topicsmanager.DTO;

import lombok.Data;

@Data
public class NewSection {
    private String name;
    private Integer size;
    private Boolean state; //TODO zmienic na isOpen
    private Integer semester;
    private Long topic; //TODO zmienic na topicId
}
