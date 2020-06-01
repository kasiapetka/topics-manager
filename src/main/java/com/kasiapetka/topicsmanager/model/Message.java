package com.kasiapetka.topicsmanager.model;

import com.kasiapetka.topicsmanager.DTO.MessageDTO;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Table(name = "messages")
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne
    private User from;

    @NotNull
    @ManyToOne
    private User to;

    @NotNull
    private String subject;

    @NotNull
    private String content;

    @NotNull
    private Date date;

    @NotNull
    private Boolean isRead;

    @NotNull
    private Boolean authorDeleted;

    @NotNull
    private Boolean receiverDeleted;

    public MessageDTO convertToDTO(){
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setContent(this.content);
        messageDTO.setFrom(this.from.convertToDTO());
        messageDTO.setTo(this.to.convertToDTO());
        messageDTO.setSubject(this.subject);
        messageDTO.setId(this.id);
        messageDTO.setDate(this.date);
        messageDTO.setIsRead(this.isRead);

        return messageDTO;
    }
}
