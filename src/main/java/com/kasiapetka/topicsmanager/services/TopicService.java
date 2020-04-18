package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.model.Topic;
import org.springframework.stereotype.Service;

@Service
public interface TopicService {
    Topic findTopicById(Long id);
}
