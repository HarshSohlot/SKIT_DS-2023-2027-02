package com.carekart.controller;

import com.carekart.model.DTO.DonorRegistrationDto;
import com.carekart.model.DTO.LoginRequestDto;
import com.carekart.model.DTO.LoginResponseDto;
import com.carekart.model.DTO.ReceiverRegistrationDto;
import com.carekart.service.DonorService;

import com.carekart.service.LoginService;
import com.carekart.service.LogoutService;
import com.carekart.service.ReceiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private DonorService donorService;

    @Autowired
    private ReceiverService receiverService ;

    @Autowired
    private LoginService loginService ;

    @Autowired
    private LogoutService logoutService ;

    // Health check
    @GetMapping("/health/check")
    public ResponseEntity<String> healthCheck() {
        return new ResponseEntity<>(
                "CareKart application is running",
                HttpStatus.OK
        );
    }

    // Donor registration
    @PostMapping("/register/donor")
    public ResponseEntity<String> registerDonor(
            @RequestBody DonorRegistrationDto donorDto) {

        boolean registered =
                donorService.registerNewDonor(donorDto);

        if (registered) {
            return new ResponseEntity<>(
                    "Donor registered successfully",
                    HttpStatus.CREATED
            );
        }
        return new ResponseEntity<>(
                "Donor registration failed",
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @PostMapping("/register/receiver")
    public ResponseEntity<String> registerReceiver(
            @RequestBody ReceiverRegistrationDto receiverDto) {

        boolean registered =
                receiverService.registerNewReceiver(receiverDto) ;

        if (registered) {
            return new ResponseEntity<>(
                    "Receiver registered successfully",
                    HttpStatus.CREATED
            );
        }
        return new ResponseEntity<>(
                "Receiver registration failed",
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginRequestDto loginRequestDto
    ){
        LoginResponseDto loginResponse = loginService.login(loginRequestDto);
        return new ResponseEntity<>(
                loginResponse ,
                HttpStatus.OK
        ) ;
    }
}