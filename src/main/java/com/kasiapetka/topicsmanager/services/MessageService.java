package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.MessageDTO;
import com.kasiapetka.topicsmanager.DTO.SendMessageDTO;
import com.kasiapetka.topicsmanager.model.Message;
import com.kasiapetka.topicsmanager.model.User;

import java.util.List;

public interface MessageService {

    Message findById(Long messageId);
    List<MessageDTO> listSentMessages(User from);
    List<MessageDTO> listReceivedMessages(User to);
    Boolean sendMessage(Message message);
    Integer sendMessages(SendMessageDTO sendMessageDTO);
    void readMessage(Message message);
    void deleteMessage(Message message);
}
