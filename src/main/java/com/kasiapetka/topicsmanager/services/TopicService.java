package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.NewTopicDTO;
import com.kasiapetka.topicsmanager.model.Topic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TopicService {
    Topic findTopicById(Long id);
    Integer addNewTopic(NewTopicDTO newTopicDTO);
    List<Topic> getTopicListByTeacherID(Long teacherID, Long subjectID);
//    List<Topic>
}
