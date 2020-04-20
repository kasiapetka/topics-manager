package com.kasiapetka.topicsmanager.controllers;


import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.DTO.AuthenticationResponse;
import com.kasiapetka.topicsmanager.DTO.RegisterForm;
import com.kasiapetka.topicsmanager.services.CodeService;
import com.kasiapetka.topicsmanager.services.IndexService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.impl.UserDetailsServiceImpl;
import com.kasiapetka.topicsmanager.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class IndexController {

    //private final Logger log = LoggerFactory.getLogger(IndexController.class);
    private StudentService studentService;
    private IndexService indexService;
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private CodeService codeService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    public IndexController(StudentService studentService, IndexService indexService,
                           UserDetailsServiceImpl userDetailsServiceImpl, CodeService codeService) {
        this.studentService = studentService;
        this.indexService = indexService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.codeService = codeService;
    }

    @RequestMapping({"/api/hello"})
    public String hello() {
        return "Hello world";
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user) throws Exception {
        System.out.println(user.getEmail() + " " + user.getPassword());
        User userExists = indexService.findUserByEmail(user.getEmail());

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Bad login creds", e);
        }

        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(user.getEmail());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        char role;

        if (userExists.getRole().getRoleName().equals("Student"))
            role = 'S';
        else if (userExists.getRole().getRoleName().equals("Teacher"))
            role = 'T';
        else if (userExists.getRole().getRoleName().equals("Admin"))
            role = 'A';
        else role = 'n';

        return ResponseEntity.ok(new AuthenticationResponse(token, role));
    }

    //@TODO refactor this FFS
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterForm newStudent) throws Exception {
        User userExists = indexService.findUserByEmail(newStudent.getEmail());
        Long album = Long.parseLong(newStudent.getAlbum());
        Student studentExists = studentService.findStudentByAlbum(album);

        if (userExists != null || studentExists == null)
            return ResponseEntity.status(401).build();
        else {
            System.out.println(newStudent);
            if (codeService.matches(newStudent.getCode(), newStudent.getAlbum())) {
                User newUser = new User(newStudent.getEmail(), newStudent.getPassword());
                indexService.create(newUser, studentExists);
            } else {
                return ResponseEntity.status(401).build();
            }

            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(newStudent.getEmail(), newStudent.getPassword()));
            } catch (BadCredentialsException e) {
                throw new Exception("Bad login creds", e);
            }

            final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(newStudent.getEmail());
            final String token = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new AuthenticationResponse(token, 'S'));
        }
    }
}