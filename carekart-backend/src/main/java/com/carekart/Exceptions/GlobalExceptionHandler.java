package com.carekart.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserRegistrationException.class)
    public ResponseEntity<String> userRegistrationExceptionHandler(
            UserRegistrationException userRegistrationException
    ){
        return new ResponseEntity<>(userRegistrationException.getMessage() , HttpStatus.INTERNAL_SERVER_ERROR) ;
    }

    @ExceptionHandler(DuplicateUserRegistrationException.class)
    public ResponseEntity<String> duplicateUserRegistrationExceptionHandler(
            DuplicateUserRegistrationException duplicateUserRegistrationException
    ){
        return new ResponseEntity<>(duplicateUserRegistrationException.getMessage() , HttpStatus.CONFLICT) ;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> UserNotFoundExceptionHandler(
            UserNotFoundException userNotFoundException
    ){
        return new ResponseEntity<>(
                userNotFoundException.getMessage() , HttpStatus.NOT_FOUND
        ) ;
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> InvalidCredentialsExceptionHandler(
            InvalidCredentialsException invalidCredentialsException
    ){
        return new ResponseEntity<>(
                invalidCredentialsException.getMessage() , HttpStatus.UNAUTHORIZED
        ) ;
    }

    @ExceptionHandler(InvalidUserTypeException.class)
    public ResponseEntity<String> InvalidUserTypeExceptionHandler(
            InvalidUserTypeException invalidUserTypeException
    ){
        return new ResponseEntity<>(
                invalidUserTypeException.getMessage() , HttpStatus.UNAUTHORIZED
        ) ;
    }
}
