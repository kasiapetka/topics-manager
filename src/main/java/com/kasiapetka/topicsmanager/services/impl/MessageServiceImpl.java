package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.MessageDTO;
import com.kasiapetka.topicsmanager.DTO.SendMessageDTO;
import com.kasiapetka.topicsmanager.model.Message;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.MessageRepository;
import com.kasiapetka.topicsmanager.repositories.UserRepository;
import com.kasiapetka.topicsmanager.services.MessageService;
import org.hibernate.HibernateException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Primary
public class MessageServiceImpl implements MessageService {

    MessageRepository messageRepository;
    UserRepository userRepository;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Message findById(Long messageId) {
        return messageRepository.findById(messageId).orElse(new Message());
    }

    @Override
    public List<MessageDTO> listSentMessages(User from) {

        List<Message> messages = new ArrayList<>();
        messageRepository.findAllByFrom(from).orElse(new ArrayList<>()).iterator().forEachRemaining(messages::add);

        List<MessageDTO> messageDTOS = new ArrayList<>();

        for(Message message : messages){
            messageDTOS.add(message.convertToDTO());
        }

        return messageDTOS;
    }

    @Override
    public List<MessageDTO> listReceivedMessages(User to) {

        List<Message> messages = new ArrayList<>();
        messageRepository.findAllByTo(to).orElse(new ArrayList<>()).iterator().forEachRemaining(messages::add);

        List<MessageDTO> messageDTOS = new ArrayList<>();

        for(Message message : messages){
            messageDTOS.add(message.convertToDTO());
        }

        return messageDTOS;
    }

    @Override
    public Boolean sendMessage(Message message) {

        Message sent = new Message();
        sent.setIsRead(false);
        sent.setDate(new Date());
        sent.setContent(message.getContent());
        sent.setFrom(message.getFrom());
        sent.setSubject(message.getSubject());
        sent.setTo(message.getTo());

        try{
            messageRepository.save(sent);
        } catch (HibernateException e){
            e.printStackTrace();
            return false;
        }

        return true;
    }

    @Override
    public Integer sendMessages(SendMessageDTO sendMessageDTO) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User from = findUserByEmail(auth.getName());

        if(from == null){
            return 500;
        }

        String subject = sendMessageDTO.getSubject();
        String content = sendMessageDTO.getContent();

        for(String email : sendMessageDTO.getReceivers()){
            User receiver = findUserByEmail(email);
            if(receiver == null){
                return 500;
            }

            Message msg = new Message();
            msg.setSubject(subject);
            msg.setContent(content);
            msg.setFrom(from);
            msg.setTo(receiver);

            if(!sendMessage(msg)){
                return 500;
            }
        }

        return 200;
    }

    @Override
    public void readMessage(Message message) {

        Message toRead = this.findById(message.getId());
        toRead.setIsRead(true);

        try {
            messageRepository.save(toRead);
        } catch (HibernateException e){
            e.printStackTrace();
        }
    }

//    @Override
//    public void deleteMessage(Message message) {
//
//        Message toRead = this.findById(message.getId());
//
//        try {
//            messageRepository.delete(toRead);
//        } catch (HibernateException e){
//            e.printStackTrace();
//        }
//    }

    @Override
    public Integer deleteMessage(String type, Long messageId) {

        Message toDelete = this.findById(messageId);

        if(type.equals("sent")){
            toDelete.setFrom(null);
        } else {
            toDelete.setTo(null);
        }

        if((toDelete.getFrom() == null) && (toDelete.getTo() == null)){
            try{
                messageRepository.delete(toDelete);
            } catch (HibernateException e){
                return 500;
            }
        } else {
            try {
                messageRepository.save(toDelete);
            } catch (HibernateException e){
                return 500;
            }
        }

        return 200;
    }

    @Override
    public Integer newMessages() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = findUserByEmail(auth.getName());

        if(user == null){
            return 500;
        }

        List<MessageDTO> receivedMessages = this.listReceivedMessages(user);
        Integer newMessages = 0;

        for(MessageDTO messageDTO : receivedMessages){
            if(!messageDTO.getIsRead()){
                newMessages++;
            }
        }

        return newMessages;
    }
}
