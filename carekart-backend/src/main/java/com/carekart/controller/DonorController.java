package com.carekart.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/donor")
public class DonorController {

    @GetMapping("/Hello")
    public ResponseEntity<String> sayHello(){
        return new ResponseEntity<>("Hi I am Donor" , HttpStatus.OK) ;
    }
}