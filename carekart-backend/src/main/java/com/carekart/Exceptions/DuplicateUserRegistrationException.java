package com.carekart.Exceptions;

public class DuplicateUserRegistrationException extends RuntimeException {
    public DuplicateUserRegistrationException(String message) {
        super(message);
    }
}
