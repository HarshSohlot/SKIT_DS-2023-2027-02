package com.carekart.model.DTO;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class LogoutRequestDto {
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
