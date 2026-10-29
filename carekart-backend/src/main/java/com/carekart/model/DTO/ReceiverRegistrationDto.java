package com.carekart.model.DTO;

import com.carekart.model.Enum.ReceiverType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ReceiverRegistrationDto {
    private String receiverId;
    private String password ;
    private String receiverName;
    private String phoneNumber;
    private String email;
    private String latitude;
    private String longitude;
    private String address;
    private ReceiverType receiverType;
    private String registrationNumber;
    private String organizationName;

    public String getReceiverId() {
        return receiverId;
    }

    public String getPassword() {
        return password;
    }

    public String getReceiverName() {
        return receiverName;
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

    public ReceiverType getReceiverType() {
        return receiverType;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getOrganizationName() {
        return organizationName;
    }
}
