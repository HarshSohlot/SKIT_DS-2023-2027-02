package com.harsh.carekart20.Model.Dto
object DummyProfileData {

    val donor = ProfileUiData(
        userId = "DONOR001",
        name = "Green Leaf Restaurant",
        email = "donor@carekart.org",
        phoneNumber = "+91 98765 43210",
        latitude = "26.8500",
        longitude = "75.8000",
        address = "Malviya Nagar, Jaipur",
        landmark = "Near Main Market",
        organizationType = "RESTAURANT",
        registrationNumber = "FSSAI123456",
        contactPersonOrOrganization = "Restaurant Manager",
        rating = 93.2,
        totalDonations = 24,
        issueCount = 2,
        donationHistory = listOf(
            "Fresh Veg Biryani - 25 portions",
            "Dal Makhani & Roti - 40 portions"
        )
    )

    val receiver = ProfileUiData(
        userId = "RECEIVER001",
        name = "Asha Food Relief NGO",
        email = "receiver@carekart.org",
        phoneNumber = "+91 98765 12345",
        latitude = "26.8200",
        longitude = "75.8100",
        address = "Jagatpura, Jaipur",
        organizationType = "NGO",
        registrationNumber = "NGO123456",
        contactPersonOrOrganization = "Asha Food Relief NGO",
        rating = 83.2,
        totalDonations = 18,
        issueCount = 1,
        donationHistory = listOf(
            "Rice and lentils received",
            "Packaged food received"
        )
    )
}