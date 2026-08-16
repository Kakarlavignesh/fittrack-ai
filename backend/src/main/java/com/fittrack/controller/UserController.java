package com.fittrack.controller;

import com.fittrack.dto.UserProfileUpdateDTO;
import com.fittrack.entity.User;
import com.fittrack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateUserProfile(Authentication authentication, @RequestBody UserProfileUpdateDTO dto) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateUserProfile(email, dto));
    }
}
