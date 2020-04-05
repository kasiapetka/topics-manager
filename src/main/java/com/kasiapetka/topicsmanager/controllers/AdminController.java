package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.parsingClasses.EditAccount;
import com.kasiapetka.topicsmanager.services.AdminService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserDetailsServiceImpl;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AdminController {

    private UserService userService;
    private AdminService adminService;
    private UserDetailsServiceImpl userDetailsServiceImpl;


    public AdminController(AdminService adminService, UserService userService,
                             UserDetailsServiceImpl userDetailsServiceImpl) {

        this.adminService = adminService;
        this.userService = userService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @PutMapping("/api/admin/modify")
    ResponseEntity<?> updateAdmin(@Valid @RequestBody User user) throws Exception{

        String oldEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User adminUser = userService.findUserByEmail(oldEmail);

        /*if (user.getEmail().equals(adminUser.getEmail()) && user.getPassword().isEmpty()) {
            return ResponseEntity.ok(adminUser);
        } else {
            if (!user.getEmail().equals(adminUser.getEmail())) {
                //TODO zmiana maila nie działa - cos z tokenem
                // studentService.changeEmail(result, user.getEmail());
                //  SecurityContextHolder.getContext().setAuthentication(null);
            }
            if (!user.getPassword().isEmpty()) {
                //zmien haslo
                adminService.changePassword(adminUser, user.getPassword());
            }
        }
*/

        EditAccount result = new EditAccount(adminUser.getEmail(),"","","","","");
        return ResponseEntity.ok(result);
    }

}
