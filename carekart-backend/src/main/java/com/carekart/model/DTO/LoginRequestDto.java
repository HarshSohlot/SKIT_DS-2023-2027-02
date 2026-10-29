package com.carekart.model.DTO;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    private String userId ;
    private String password ;
    private String userType ;

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public String getUserType() {
        return userType;
    }
}
