package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.RegisterForm;
import com.kasiapetka.topicsmanager.services.IndexService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.util.JwtUtil;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RestController
public class IndexController {

    //private final Logger log = LoggerFactory.getLogger(IndexController.class);
    private StudentService studentService;
    private IndexService indexService;
    private JwtUtil jwtUtil;

    public IndexController(StudentService studentService, IndexService indexService) {
        this.studentService = studentService;
        this.indexService = indexService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user) {
        System.out.println(user.getEmail() + " " + user.getPassword());
        User userExists = indexService.findUserByEmail(user.getEmail());

       /* if (userExists != null) {
            user.setToken(jwtUtil.generateToken(user.getEmail()));
        }
        return user;*/

        if (userExists != null) {
            if (userExists.getRole().getRoleName().equals("Student"))
                return ResponseEntity.status(210).build();
            if (userExists.getRole().getRoleName().equals("Teacher"))
                return ResponseEntity.status(211).build();
            if (userExists.getRole().getRoleName().equals("Admin"))
                return ResponseEntity.status(212).build();
        }

           return ResponseEntity.status(401).build();
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterForm newStudent) {
        User userExists = indexService.findUserByEmail(newStudent.getEmail());
        Long album = Long.parseLong(newStudent.getAlbum());
        Student studentExists = studentService.findStudentByAlbum(album);

        if(userExists != null || studentExists == null)
            return ResponseEntity.status(401).build();
        else {
            User newUser = new User(newStudent.getEmail(),newStudent.getPassword());
            indexService.create(newUser,studentExists);
            return ResponseEntity.status(201).build();
        }
    }
}