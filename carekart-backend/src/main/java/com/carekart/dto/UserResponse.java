package com.carekart.dto;

import com.carekart.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String name;
    private String email;
    private Role role;
    private Instant createdAt;
}
