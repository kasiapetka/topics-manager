package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.JoinSectionMessageDTO;
import com.kasiapetka.topicsmanager.DTO.MessageDTO;
import com.kasiapetka.topicsmanager.DTO.SendMessageDTO;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MessageControler {

    MessageService messageService;
    UserService userService;
    StudentService studentService;
    TeacherService teacherService;
    SectionService sectionService;

    public MessageControler(MessageService messageService, UserService userService, StudentService studentService,
                            TeacherService teacherService, SectionService sectionService) {
        this.messageService = messageService;
        this.userService = userService;
        this.studentService = studentService;
        this.teacherService = teacherService;
        this.sectionService = sectionService;
    }

    @GetMapping("/api/message/inbox")
    public List<MessageDTO> listReceivedMessages(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());

        return messageService.listReceivedMessages(user);
    }

    @GetMapping("api/message/sent")
    public List<MessageDTO> listSentMessages(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());

        return messageService.listSentMessages(user);
    }

    @PostMapping("/api/message/send")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody SendMessageDTO sendMessageDTO){

        Integer responseCode = messageService.sendMessages(sendMessageDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @PutMapping("/api/message/{messageID}")
    public ResponseEntity<?> readMessage(@PathVariable Long messageID){

        messageService.readMessage(messageService.findById(messageID));

        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/message/{messageID}")
    public MessageDTO getMessage(@PathVariable Long messageID){
        return messageService.findById(messageID).convertToDTO();
    }

    @GetMapping("/api/message/newmessages")
    public Integer newMessages(){
        return messageService.newMessages();
    }

    @PostMapping("/api/message/joinsectionmessage")
    public ResponseEntity sendJoinSectionMessage(@Valid @RequestBody JoinSectionMessageDTO joinSectionMessageDTO){

        //@Todo maybe refactor this?
        SendMessageDTO sendMessageDTO = new SendMessageDTO();

        List<String> receivers = new ArrayList<>();
        receivers.add(joinSectionMessageDTO.getEmail());
        sendMessageDTO.setReceivers(receivers);
        sendMessageDTO.setSubject("Someone tried to add you to another section.");

        Section section = sectionService.findSectionById(joinSectionMessageDTO.getSectionId());

        StringBuilder message = new StringBuilder();
        message
                .append("Hi teacher with email: ")
                .append(joinSectionMessageDTO.getEmail())
                .append(" tried to add you to section: ")
                .append(section.getName())
                .append(" on semester: ")
                .append(section.getSemester().getSemester())
                .append(". If you wish to join this section find it and do it or contact this teacher via its email.")
                .append("\n Wish you nice day bro! (or sis <3) ");

        sendMessageDTO.setContent(message.toString());

        Integer responseCode = messageService.sendMessages(sendMessageDTO);

        return ResponseEntity.status(responseCode).build();
    }

    @DeleteMapping("/api/message/{type}/{messageID}")
    public ResponseEntity<?> deleteMessage(@PathVariable String type, @PathVariable Long messageID){

        Integer responseCode = messageService.deleteMessage(type, messageID);

        return ResponseEntity.status(responseCode).build();
    }

//    @RequestMapping("/testsend")
//    public String test(){
//
//        User user1 = userService.findUserByEmail("aaa@aaa.com");
//        User user2 = userService.findUserByEmail("aaa@aaa2.com");
//
//        Message message = new Message();
//        message.setFrom(user1);
//        message.setTo(user2);
//        message.setSubject("Wybacz Kasiu za moj humor :(");
//        message.setContent("Ja tak na prawde bardzo lubie z Toba pracowac i przepraszam, ze czesto ze mna sie srednio pracuje :(");
//
//        messageService.sendMessage(message);
//
//        return "Message sent";
//    }
//
//    @GetMapping("/testDelete")
//    public void test2(){
//
//        Message message = messageService.findById(47l);
//
//        messageService.deleteMessage(message);
//    }
//
//    @GetMapping("/testRead")
//    public void test3(){
//
//        Message message = messageService.findById(47l);
//
//        messageService.deleteMessage(message);
//    }
//
//    @GetMapping("/testreceived")
//    public List<MessageDTO> listReceived(){
//        return messageService.listReceivedMessages(userService.findUserByEmail("aaa@aaa2.com"));
//    }
//
//    @GetMapping("/testsent")
//    public List<MessageDTO> listSent(){
//        return messageService.listSentMessages(userService.findUserByEmail("aaa@aaa.com"));
//    }
}
