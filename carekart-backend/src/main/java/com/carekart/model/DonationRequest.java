package com.carekart.model;

import CareKart.Model.Enum.DonationRequestStatus;
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

@Document(collection = "DonationRequests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonationRequest {
    @Id
    private String id ;

    // need to be auto generated
    @Indexed(unique = true)
    private String donationRequestId ;
    @NotBlank
    private String donorId ;
    @NotBlank
    private String donorName ;
    @NotBlank
    private String phoneNumber ;
    @NotBlank
    private String email ;
    @NotNull
    private DonorType donorType ;

    @NotNull
    private List<FoodItem> foodItems ;

    @NotNull
    private DonationRequestStatus donationRequestStatus ;

    @NotBlank
    private String claimedReceiverId ;
}
