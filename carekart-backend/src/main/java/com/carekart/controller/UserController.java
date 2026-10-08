package com.carekart.controller;

import com.carekart.dto.UserResponse;
import com.carekart.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable String id) {
        return userService.getById(id);
    }
}
