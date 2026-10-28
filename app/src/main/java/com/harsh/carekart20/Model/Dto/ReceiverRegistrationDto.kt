package com.harsh.carekart20.Model.Dto

import com.harsh.carekart20.Model.Enum.ReceiverType

data class ReceiverRegistrationDto(
    val receiverId: String,
    val password : String,
    val receiverName: String,
    val phoneNumber: String,
    val email: String,
    val latitude: String,
    val longitude: String,
    val address: String,
    val receiverType: ReceiverType,
    val registrationNumber: String,
    val organizationName: String
)
