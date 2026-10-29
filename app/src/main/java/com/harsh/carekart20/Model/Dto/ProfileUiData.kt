package com.harsh.carekart20.Model.Dto

data class ProfileUiData(
    val userId: String,
    val name: String,
    val email: String,
    val phoneNumber: String,
    val latitude: String,
    val longitude: String,
    val address: String,

    // Donor-specific / receiver-specific details
    val organizationType: String,
    val registrationNumber: String,
    val contactPersonOrOrganization: String,
    val landmark: String? = null,

    // Statistics
    val rating: Double,
    val totalDonations: Int,
    val issueCount: Int,
    val donationHistory: List<String>
)
