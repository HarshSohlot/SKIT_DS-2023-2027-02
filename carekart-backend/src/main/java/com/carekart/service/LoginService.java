package com.carekart.service;


import com.carekart.Exceptions.InvalidCredentialsException;
import com.carekart.Exceptions.InvalidUserTypeException;
import com.carekart.Exceptions.UserNotFoundException;
import com.carekart.config.JwtService;
import com.carekart.model.DTO.LoginRequestDto;
import com.carekart.model.DTO.LoginResponseDto;
import com.carekart.model.Donor;
import com.carekart.model.Receiver;
import com.carekart.repository.DonorRepository;
import com.carekart.repository.ReceiverRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LoginService {
    @Autowired
    private DonorRepository donorRepository ;
    @Autowired
    private ReceiverRepository receiverRepository ;
    @Autowired
    private JwtService jwtService ;
    @Autowired
    private PasswordEncoder passwordEncoder ;

    public LoginResponseDto login(LoginRequestDto loginRequestDto){
        if(
                loginRequestDto.getUserId() == null
                || loginRequestDto.getPassword() == null
                || loginRequestDto.getPassword().isBlank()
                || loginRequestDto.getUserType() == null
        ){
            throw new IllegalArgumentException(
                    "User Id, password and User type are required"
            );
        }

        String userType = loginRequestDto.getUserType().trim().toUpperCase();
        String role ;
        String userId ;

        if(userType.equals("DONOR")){
            Donor donor = donorRepository.findByDonorId(loginRequestDto.getUserId())
                    .orElseThrow(() ->
                            new UserNotFoundException(
                                    "No Donor found with id : " + loginRequestDto.getUserId()
                            ));

            if(!passwordEncoder.matches(
                    loginRequestDto.getPassword() ,
                    donor.getPassword()
            )){
                throw new InvalidCredentialsException("Incorrect donorId or password!") ;
            }

            role = "DONOR" ;
            userId = donor.getDonorId() ;
        }
        else if(userType.equals("RECEIVER")){
            Receiver receiver = receiverRepository.findByReceiverId(loginRequestDto.getUserId())
                    .orElseThrow(
                            () -> new UserNotFoundException(
                                    "No Receiver found with id : " + loginRequestDto.getUserId()
                            )
                    );

            if(!passwordEncoder.matches(
                    loginRequestDto.getPassword() ,
                    receiver.getPassword()
            )){
                throw new InvalidCredentialsException("Incorrect receiverId or password!") ;
            }
            role = "RECEIVER" ;
            userId = receiver.getReceiverId() ;
        }
        // admin login left
        else{
            throw new InvalidUserTypeException(
                    "User can only be DONOR or RECEIVER"
            );
        }

        String accessToken = jwtService.generateAccessToken(userId, role);
        String refreshToken = jwtService.generateRefreshToken(userId, role);

        return new LoginResponseDto(
                accessToken ,
                refreshToken
        ) ;
    }
}
