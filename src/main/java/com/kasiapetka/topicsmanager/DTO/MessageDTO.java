package com.kasiapetka.topicsmanager.DTO;

import com.kasiapetka.topicsmanager.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private Long id;
    private UserDTO from;
    private UserDTO to;
    private String subject;
    private String content;
    private Date date;
    private Boolean isRead;

    public Message convertToMessage(){
        Message message = new Message();
        message.setFrom(this.from.convertToUser());
        message.setTo(this.to.convertToUser());
        message.setSubject(this.subject);
        message.setContent(this.content);
        message.setDate(this.date);
        message.setId(this.id);
        message.setIsRead(this.isRead);

        return message;
    }
}
