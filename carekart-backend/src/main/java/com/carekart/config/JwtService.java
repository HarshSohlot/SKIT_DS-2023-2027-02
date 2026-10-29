package com.carekart.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey secretKey ;
    private final long accessExpiration;
    private final long refreshExpiration;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-expiration}") long accessExpiration,
            @Value("${jwt.refresh-expiration}") long refreshExpiration
    ){
        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

        this.accessExpiration = accessExpiration;
        this.refreshExpiration = refreshExpiration;
    }

    public String generateAccessToken(String subject, String role){
        return generateToken(subject,role, "access" , accessExpiration) ;
    }

    public String generateRefreshToken(String subject, String role){
        return generateToken(subject,role, "refresh" , refreshExpiration) ;
    }

    private String generateToken(String subject, String role, String tokenType , long expiration){
        if (subject == null || subject.isBlank()) {
            throw new IllegalArgumentException("Subject cannot be empty");
        }
        if (expiration <= 0) {
            throw new IllegalArgumentException(
                    "Token expiration must be positive"
            );
        }
        Date now = new Date() ;
        return Jwts.builder()
                .subject(subject)
                .claim("role" , role)
                .claim("tokenType" , tokenType)
                .issuedAt(now)
                .expiration(new Date(now.getTime()+expiration))
                .signWith(secretKey)
                .compact() ;
    }

    private Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload() ;
    }

    public boolean isValidAccessToken(String token){
        try{
            Claims claims = extractClaims(token) ;
            return "access".equals(claims.get("tokenType" , String.class))
                    && claims.getSubject() != null ;
        } catch (JwtException | IllegalArgumentException e){
            return false ;
        }
    }

    public boolean isValidRefreshToken(String token) {
        try {
            Claims claims = extractClaims(token);

            return "refresh".equals(claims.get("tokenType", String.class))
                    && claims.getSubject() != null;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractSubject(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }
}
