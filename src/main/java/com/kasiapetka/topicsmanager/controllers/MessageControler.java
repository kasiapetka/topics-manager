package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.MessageDTO;
import com.kasiapetka.topicsmanager.DTO.SendMessageDTO;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.MessageService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class MessageControler {

    MessageService messageService;
    UserService userService;
    StudentService studentService;
    TeacherService teacherService;

    public MessageControler(MessageService messageService, UserService userService, StudentService studentService,
                            TeacherService teacherService) {
        this.messageService = messageService;
        this.userService = userService;
        this.studentService = studentService;
        this.teacherService = teacherService;
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
