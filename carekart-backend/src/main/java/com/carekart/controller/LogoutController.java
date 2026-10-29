package com.carekart.controller;


import com.carekart.config.JwtService;
import com.carekart.model.DTO.LogoutRequestDto;
import com.carekart.service.LogoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/auth")
public class LogoutController {
    @Autowired
    private LogoutService logoutService ;

    @Autowired
    private JwtService jwtService ;

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            HttpServletRequest httpRequest ,
            @RequestBody LogoutRequestDto logoutRequestDto
    ){
        String header = httpRequest.getHeader("Authorization") ;
        if(header == null || !header.startsWith("Bearer ")){
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Access token required"
            );
        }
        String accessToken = header.substring(7);
        String refreshToken = logoutRequestDto.getRefreshToken();

        if(!jwtService.isValidAccessToken(accessToken)){
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid access token"
            );
        }

        if (refreshToken == null || refreshToken.isBlank()
                || !jwtService.isValidRefreshToken(refreshToken)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid refresh token"
            );
        }

        if (!jwtService.extractSubject(accessToken)
                .equals(jwtService.extractSubject(refreshToken))
                || !jwtService.extractRole(accessToken)
                .equals(jwtService.extractRole(refreshToken))) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Tokens do not belong to the same session"
            );
        }

        logoutService.revokeToken(accessToken);
        logoutService.revokeToken(refreshToken);

        return new ResponseEntity<>("Logout Successful" , HttpStatus.OK) ;
    }
}