package com.harsh.carekart20.Model

import com.harsh.carekart20.Model.Enum.DonationRequestStatus

data class DonationRequest(
    val id: String?,
    val donationRequestId: String,
    val donorId: String,
    val foodItem: FoodItem,
    val donationRequestStatus: DonationRequestStatus,
    val claimedReceiverId: String?
)
