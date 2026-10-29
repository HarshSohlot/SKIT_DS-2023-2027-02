package com.carekart.model;

import CareKart.Model.Enum.ReceiverType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Receiver")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receiver {
    @Id
    private String id ;

    // basic details
    @Indexed(unique = true)
    private String receiverId ;
    @NotBlank
    private String password ;
    @NotBlank
    private String receiverName ;
    @NotBlank
    private String phoneNumber ;
    @NotBlank
    private String email ;

    // location details
    @NotBlank
    private String latitude ;
    @NotBlank
    private String longitude ;
    @NotBlank
    private String address ;

    // receiver type
    @NotNull
    private ReceiverType receiverType ;
    @NotBlank
    private String registrationNumber ;
    @NotBlank
    private String organizationName ;

    private int rating ;
    private int totalDonationsReceived ;
    private int cancelledDonationRequests ;

    private List<String> donationsReceivedDetails ;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ReceiverType getReceiverType() {
        return receiverType;
    }

    public void setReceiverType(ReceiverType receiverType) {
        this.receiverType = receiverType;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getTotalDonationsReceived() {
        return totalDonationsReceived;
    }

    public void setTotalDonationsReceived(int totalDonationsReceived) {
        this.totalDonationsReceived = totalDonationsReceived;
    }

    public int getCancelledDonationRequests() {
        return cancelledDonationRequests;
    }

    public void setCancelledDonationRequests(int cancelledDonationRequests) {
        this.cancelledDonationRequests = cancelledDonationRequests;
    }

    public List<String> getDonationsReceivedDetails() {
        return donationsReceivedDetails;
    }

    public void setDonationsReceivedDetails(List<String> donationsReceivedDetails) {
        this.donationsReceivedDetails = donationsReceivedDetails;
    }
}
