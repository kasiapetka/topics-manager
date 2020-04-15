package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Topic;
import org.springframework.data.repository.CrudRepository;

public interface TopicRepository extends CrudRepository<Topic, Long> {
    Topic findByName(String name);
}
