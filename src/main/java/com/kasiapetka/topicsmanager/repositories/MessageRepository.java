package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Message;
import com.kasiapetka.topicsmanager.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends CrudRepository<Message, Long> {
    Optional<List<Message>> findAllByTo(User user);
    Optional<List<Message>> findAllByFrom(User user);
}
