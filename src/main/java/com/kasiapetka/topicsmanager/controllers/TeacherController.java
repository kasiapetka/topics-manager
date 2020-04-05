package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.Teacher;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.TeacherService;
import com.kasiapetka.topicsmanager.services.UserDetailsServiceImpl;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class TeacherController {
    private UserService userService;
    private TeacherService teacherService;
    private UserDetailsServiceImpl userDetailsServiceImpl;


    public TeacherController(TeacherService teacherService, UserService userService,
                             UserDetailsServiceImpl userDetailsServiceImpl) {
        this.teacherService = teacherService;
        this.userService = userService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @PutMapping("/api/teacher/modify")
    ResponseEntity<?> updateTeacher(@Valid @RequestBody EditAccount user) throws Exception{

        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacherUser = userService.findUserByEmail(oldEmail);
        Teacher teacher = teacherService.findTeacherByUser(teacherUser);

        /*if (user.getEmail().equals(result.getUser().getEmail()) && user.getPassword().isEmpty()) {
            return ResponseEntity.ok(result);
        } else {
            if (!user.getEmail().equals(result.getUser().getEmail())) {
                //TODO zmiana maila nie działa - cos z tokenem
                // studentService.changeEmail(result, user.getEmail());
                //  SecurityContextHolder.getContext().setAuthentication(null);
            }
            if (!user.getPassword().isEmpty()) {
                //zmien haslo
                teacherService.changePassword(result, user.getPassword());
            }
        }

        result= teacherService.findTeacherById(result.getId());
        return ResponseEntity.ok(result);*/
        EditAccount result = new EditAccount(teacherUser.getEmail(),"","","",teacher.getName(),teacher.getSurname());
        return ResponseEntity.ok(result);
    }
}
