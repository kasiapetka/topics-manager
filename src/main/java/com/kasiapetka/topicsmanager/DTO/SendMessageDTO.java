package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageDTO {

    private List<String> receivers;
    private String subject;
    private String content;
}
