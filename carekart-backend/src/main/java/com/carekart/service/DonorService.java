package com.carekart.service;


import com.carekart.Exceptions.UserRegistrationException;
import com.carekart.model.DTO.DonorRegistrationDto;
import com.carekart.model.Donor;
import com.carekart.repository.DonorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DonorService {
    @Autowired
    private DonorRepository donorRepository ;

    @Autowired
    private PasswordEncoder passwordEncoder ;

    // donor registration
    public boolean registerNewDonor(DonorRegistrationDto donorRegistrationDto){
        try {
            Donor donor = new Donor() ;
            donor.setDonorId(donorRegistrationDto.getDonorId());
            donor.setPassword(passwordEncoder.encode(donorRegistrationDto.getPassword()));
            donor.setDonorName(donorRegistrationDto.getDonorName());
            donor.setPhoneNumber(donorRegistrationDto.getPhoneNumber());
            donor.setEmail(donorRegistrationDto.getEmail());
            donor.setLatitude(donorRegistrationDto.getLatitude());
            donor.setLongitude(donorRegistrationDto.getLongitude());
            donor.setAddress(donorRegistrationDto.getAddress());
            donor.setLandmark(donorRegistrationDto.getLandmark());
            donor.setDonorType(donorRegistrationDto.getDonorType());
            donor.setRegistrationNumber(donorRegistrationDto.getRegistrationNumber());
            donor.setOwnerName(donorRegistrationDto.getOwnerName());
            donor.setRating(90.0);
            donor.setTotalDonationsMade(0);
            donor.setFaultyDonations(0);

            donorRepository.save(donor) ;
            return true ;
        }catch (DataAccessException e) {
            log.error("Database error while registering donor", e);

            throw new UserRegistrationException(
                    "Error registering donor", e
            );
        }
    }
}
