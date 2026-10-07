package com.harsh.carekart20.Model

data class FoodDonation(
    val id: String,
    val title: String,
    val category: String,
    val donorName: String,
    val quantity: String,
    val distance: String,
    val pickupLocation: String,
    val cookedTime: String,
    val predictedExpiryHours: Float,
    val safetyScore: Float,
    val status: String = "AVAILABLE"
)
