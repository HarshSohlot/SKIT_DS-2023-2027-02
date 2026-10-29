package com.carekart.model;

import CareKart.Model.Enum.DonorType;
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

@Document(collection = "Donor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Donor {
    @Id
    private String id ;

    // basic details
    @Indexed(unique = true)
    private String donorId;
    @NotBlank
    private String donorName ;
    @NotBlank
    private String password ;
    @NotBlank
    private String phoneNumber ;
    @NotBlank
    private String email ;

    // location
    @NotBlank
    private String latitude ;
    @NotBlank
    private String longitude ;
    @NotBlank
    private String address ;
    @NotBlank
    private String landmark ;

    // donor type
    @NotNull
    private DonorType donorType ;
    @NotBlank
    private String registrationNumber ;
    @NotBlank
    private String ownerName ;

    private double rating;
    private int totalDonationsMade;
    private int faultyDonations;

    @NotNull
    private List<String> donationsMadeDetails ;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDonorId() {
        return donorId;
    }

    public void setDonorId(String donorId) {
        this.donorId = donorId;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
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

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public DonorType getDonorType() {
        return donorType;
    }

    public void setDonorType(DonorType donorType) {
        this.donorType = donorType;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getTotalDonationsMade() {
        return totalDonationsMade;
    }

    public void setTotalDonationsMade(int totalDonationsMade) {
        this.totalDonationsMade = totalDonationsMade;
    }

    public int getFaultyDonations() {
        return faultyDonations;
    }

    public void setFaultyDonations(int faultyDonations) {
        this.faultyDonations = faultyDonations;
    }

    public List<String> getDonationsMadeDetails() {
        return donationsMadeDetails;
    }

    public void setDonationsMadeDetails(List<String> donationsMadeDetails) {
        this.donationsMadeDetails = donationsMadeDetails;
    }
}
