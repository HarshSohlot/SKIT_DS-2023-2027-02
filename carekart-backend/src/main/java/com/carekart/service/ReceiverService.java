package com.carekart.service;

import CareKart.Exceptions.UserRegistrationException;
import CareKart.Model.DTO.ReceiverRegistrationDto;
import CareKart.Model.Receiver;
import CareKart.Repository.ReceiverRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ReceiverService {
    @Autowired
    private ReceiverRepository receiverRepository;

    @Autowired
    private PasswordEncoder passwordEncoder ;

    // receiver registration
    public boolean registerNewReceiver(ReceiverRegistrationDto receiverRegistrationDto) {
        try {
            Receiver receiver = new Receiver();

            receiver.setReceiverId(receiverRegistrationDto.getReceiverId());
            receiver.setPassword(passwordEncoder.encode(receiverRegistrationDto.getPassword()));
            receiver.setReceiverName(receiverRegistrationDto.getReceiverName());
            receiver.setPhoneNumber(receiverRegistrationDto.getPhoneNumber());
            receiver.setEmail(receiverRegistrationDto.getEmail());
            receiver.setLatitude(receiverRegistrationDto.getLatitude());
            receiver.setLongitude(receiverRegistrationDto.getLongitude());
            receiver.setAddress(receiverRegistrationDto.getAddress());
            receiver.setReceiverType(receiverRegistrationDto.getReceiverType());
            receiver.setRegistrationNumber(receiverRegistrationDto.getRegistrationNumber());
            receiver.setOrganizationName(receiverRegistrationDto.getOrganizationName());

            // Initialize receiver statistics
            receiver.setRating(90);
            receiver.setTotalDonationsReceived(0);
            receiver.setCancelledDonationRequests(0);

            receiverRepository.save(receiver);
            return true;

        } catch (DataAccessException e) {
            log.error("Database error while registering receiver", e);

            throw new UserRegistrationException(
                    "Error registering receiver", e
            );
        }
    }
}
