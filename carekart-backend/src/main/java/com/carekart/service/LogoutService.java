package com.carekart.service;


import com.carekart.config.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.HexFormat;

@Service
@Slf4j
public class LogoutService {

    private final StringRedisTemplate redisTemplate;
    private final JwtService jwtService;

    public LogoutService(StringRedisTemplate redisTemplate, JwtService jwtService) {
        this.redisTemplate = redisTemplate;
        this.jwtService = jwtService;
    }

    private String hashToken(String token){
        try{
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256") ;
            byte[] hash = messageDigest.digest(
                    token.getBytes(StandardCharsets.UTF_8)
            );
            return HexFormat.of().formatHex(hash) ;
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(
                    "SHA-256 is unavailable" , e
            ) ;
        }
    }

    private String getKey(String token){
        return "revoked : "+hashToken(token) ;
    }

    public void revokeToken(String token){
        long expirationTime = jwtService.extractExpiration(token).getTime();
        long remainingTime = expirationTime - System.currentTimeMillis();

        if(remainingTime <= 0) return ;

        redisTemplate.opsForValue().set(
                getKey(token) ,
                "1" ,
                Duration.ofMillis(remainingTime)
        );
    }

    public boolean isRevoked(String token){
        return Boolean.TRUE.equals(
                redisTemplate.hasKey(getKey(token))
        ) ;
    }
}
