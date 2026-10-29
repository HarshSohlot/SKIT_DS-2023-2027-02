package com.carekart.model.DTO;

import com.carekart.model.Enum.DonorType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class DonorRegistrationDto {
    private String donorId;
    private String password ;
    private String donorName;
    private String phoneNumber;
    private String email;
    private String latitude;
    private String longitude;
    private String address;
    private String landmark;
    private DonorType donorType;
    private String registrationNumber;
    private String ownerName;

    public String getDonorId() {
        return donorId;
    }

    public String getPassword() {
        return password;
    }

    public String getDonorName() {
        return donorName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public String getAddress() {
        return address;
    }

    public String getLandmark() {
        return landmark;
    }

    public DonorType getDonorType() {
        return donorType;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }
}
