package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicsListDTO {
    List<Topic> topicList;
}
