package com.harsh.carekart20.Model.Dto

import com.harsh.carekart20.Model.Enum.DonorType

data class DonorRegistrationDto(
    val donorId: String,
    val password : String,
    val donorName: String,
    val phoneNumber: String,
    val email: String,
    val latitude: String,
    val longitude: String,
    val address: String,
    val landmark: String,
    val donorType: DonorType,
    val registrationNumber: String,
    val ownerName: String
)
