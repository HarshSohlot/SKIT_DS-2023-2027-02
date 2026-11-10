package com.harsh.carekart20.Screen.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.VolunteerActivism
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.DonationRequest
import com.harsh.carekart20.Model.Enum.DonationRequestStatus
import com.harsh.carekart20.Model.Enum.FoodItemType
import com.harsh.carekart20.Model.Enum.QuantityUnit
import com.harsh.carekart20.Model.FoodDonation
import com.harsh.carekart20.Model.FoodItem
import com.harsh.carekart20.Screen.Components.CareKartBottomBar
import com.harsh.carekart20.Screen.Components.CareKartButton
import com.harsh.carekart20.Screen.Components.CareKartTextField
import com.harsh.carekart20.Screen.Components.DonationDetailRow
import com.harsh.carekart20.Screen.Components.DonorDonationCard
import com.harsh.carekart20.Screen.Components.DonorStatCard
import com.harsh.carekart20.Screen.Components.FoodListingCard
import com.harsh.carekart20.ui.theme.EmeraldContainer
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary


private enum class DonorAction {
    APPROVE,
    CANCEL,
    DELETE
}

@Composable
fun DonorDashboardScreen(
    onNavigateToProfile: () -> Unit,
    onAddFoodClick: () -> Unit = {}
) {

    val donations = remember {
        mutableStateListOf(

            // AVAILABLE
            DonationRequest(
                id = "mongo-101",
                donationRequestId = "DON-101",
                donorId = "DONOR-001",
                foodItem = FoodItem(
                    foodItemName = "Fresh Vegetable Biryani",
                    foodItemType = FoodItemType.COOKED,
                    quantity = 25,
                    quantityUnit = QuantityUnit.values().first(),
                    ingridientsList = listOf(
                        "Rice", "Vegetables", "Spices"
                    ),
                    cookingTime = "2026-11-10T10:30:00",
                    oilUsed = null,
                    expiryTime = "2026-11-10T16:30:00",
                    foodPicture = null
                ),
                donationRequestStatus = DonationRequestStatus.AVAILABLE,
                claimedReceiverId = null
            ),

            // CLAIMED
            DonationRequest(
                id = "mongo-102",
                donationRequestId = "DON-102",
                donorId = "DONOR-001",
                foodItem = FoodItem(
                    foodItemName = "Dal Makhani & Roti",
                    foodItemType = FoodItemType.COOKED,
                    quantity = 40,
                    quantityUnit = QuantityUnit.values().first(),
                    ingridientsList = listOf(
                        "Dal", "Butter", "Wheat", "Spices"
                    ),
                    cookingTime = "2026-11-10T11:00:00",
                    oilUsed = null,
                    expiryTime = "2026-11-10T17:00:00",
                    foodPicture = null
                ),
                donationRequestStatus = DonationRequestStatus.CLAIMED,
                claimedReceiverId = "RECEIVER-001"
            ),

            // COMPLETED
            DonationRequest(
                id = "mongo-103",
                donationRequestId = "DON-103",
                donorId = "DONOR-001",
                foodItem = FoodItem(
                    foodItemName = "Packed Meal Boxes",
                    foodItemType = FoodItemType.PACKED,
                    quantity = 20,
                    quantityUnit = QuantityUnit.values().first(),
                    ingridientsList = listOf(
                        "Rice", "Dal", "Vegetables"
                    ),
                    cookingTime = "2026-11-10T09:00:00",
                    oilUsed = null,
                    expiryTime = "2026-11-10T21:00:00",
                    foodPicture = null
                ),
                donationRequestStatus = DonationRequestStatus.COMPLETED,
                claimedReceiverId = "RECEIVER-002"
            ),

            // CANCELLED
            DonationRequest(
                id = "mongo-104",
                donationRequestId = "DON-104",
                donorId = "DONOR-001",
                foodItem = FoodItem(
                    foodItemName = "Fresh Vegetable Pulao",
                    foodItemType = FoodItemType.COOKED,
                    quantity = 15,
                    quantityUnit = QuantityUnit.values().first(),
                    ingridientsList = listOf(
                        "Rice", "Vegetables"
                    ),
                    cookingTime = "2026-11-09T14:00:00",
                    oilUsed = null,
                    expiryTime = "2026-11-09T19:00:00",
                    foodPicture = null
                ),
                donationRequestStatus = DonationRequestStatus.CANCELLED,
                claimedReceiverId = "RECEIVER-003"
            )
        )
    }

    var selectedFilter by remember {
        mutableStateOf(DonationRequestStatus.AVAILABLE)
    }

    var selectedDonation by remember {
        mutableStateOf<DonationRequest?>(null)
    }

    var detailsDonation by remember {
        mutableStateOf<DonationRequest?>(null)
    }

    var selectedAction by remember {
        mutableStateOf<DonorAction?>(null)
    }

    val totalDonations = donations.size

    val claimedCount = donations.count {
        it.donationRequestStatus == DonationRequestStatus.CLAIMED
    }

    val completedCount = donations.count {
        it.donationRequestStatus == DonationRequestStatus.COMPLETED
    }

    val filteredDonations = donations.filter {
        it.donationRequestStatus == selectedFilter
    }

    val filters = listOf(
        DonationRequestStatus.AVAILABLE,
        DonationRequestStatus.CLAIMED,
        DonationRequestStatus.COMPLETED,
        DonationRequestStatus.CANCELLED,
        DonationRequestStatus.EXPIRED
    )

    Scaffold(
        containerColor = Color(0xFFF8FAFC),
        bottomBar = {
            CareKartBottomBar(
                currentRoute = "donor_dashboard",
                onNavigate = { route ->
                    if (route == "profile") {
                        onNavigateToProfile()
                    }
                },
                onAddFoodClick = onAddFoodClick
            )
        }
    ) { paddingValues ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(
                horizontal = 20.dp,
                vertical = 18.dp
            ),
            verticalArrangement = Arrangement.spacedBy(18.dp)
        ) {

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(5.dp)
                    ) {
                        Text(
                            text = "Welcome Back!",
                            fontSize = 13.sp,
                            color = TextSecondary
                        )

                        Text(
                            text = "Donor Dashboard",
                            fontSize = 23.sp,
                            fontWeight = FontWeight.Bold,
                            color = TextPrimary
                        )

                        Text(
                            text = "Manage your food donations",
                            fontSize = 12.sp,
                            color = TextSecondary
                        )
                    }

                    IconButton(
                        onClick = onNavigateToProfile,
                        modifier = Modifier
                            .size(46.dp)
                            .clip(CircleShape)
                            .background(EmeraldContainer)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = "Profile",
                            tint = EmeraldPrimary
                        )
                    }
                }
            }

            // --------------------------------
            // STATISTICS
            // --------------------------------

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    DonorStatCard(
                        modifier = Modifier.weight(1f),
                        title = "Total",
                        count = totalDonations,
                        background = EmeraldContainer,
                        countColor = EmeraldPrimary
                    )

                    DonorStatCard(
                        modifier = Modifier.weight(1f),
                        title = "Claimed",
                        count = claimedCount,
                        background = Color(0xFFFFF1D6),
                        countColor = Color(0xFFB7791F)
                    )

                    DonorStatCard(
                        modifier = Modifier.weight(1f),
                        title = "Completed",
                        count = completedCount,
                        background = Color(0xFFE3F2FD),
                        countColor = Color(0xFF2876B9)
                    )
                }
            }

            if (claimedCount > 0) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = EmeraldPrimary
                        )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(
                                modifier = Modifier.weight(1f),
                                verticalArrangement = Arrangement.spacedBy(5.dp)
                            ) {
                                Text(
                                    text = "$claimedCount Donations Need Attention",
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = SurfaceWhite
                                )

                                Text(
                                    text = "Review claimed donations and take action.",
                                    fontSize = 11.sp,
                                    color = SurfaceWhite.copy(alpha = 0.85f)
                                )
                            }

                            TextButton(
                                onClick = {
                                    selectedFilter = DonationRequestStatus.CLAIMED
                                }
                            ) {
                                Text(
                                    text = "Review",
                                    color = SurfaceWhite,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            }

            item {
                Column(
                    verticalArrangement = Arrangement.spacedBy(5.dp)
                ) {
                    Text(
                        text = "My Donations",
                        fontSize = 19.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )

                    Text(
                        text = "Track and manage your donations",
                        fontSize = 12.sp,
                        color = TextSecondary
                    )
                }
            }

            item {
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(filters) { status ->

                        val label = when (status) {
                            DonationRequestStatus.AVAILABLE -> "Available"
                            DonationRequestStatus.CLAIMED -> "Claimed"
                            DonationRequestStatus.COMPLETED -> "Completed"
                            DonationRequestStatus.CANCELLED -> "Cancelled"
                            DonationRequestStatus.EXPIRED -> "Expired"
                        }

                        FilterChip(
                            selected = selectedFilter == status,
                            onClick = {
                                selectedFilter = status
                            },
                            label = {
                                Text(label)
                            },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = EmeraldPrimary,
                                selectedLabelColor = SurfaceWhite
                            ),
                            border = FilterChipDefaults.filterChipBorder(
                                enabled = true,
                                selected = selectedFilter == status,
                                borderColor = EmeraldContainer,
                                selectedBorderColor = EmeraldPrimary
                            )
                        )
                    }
                }
            }

            if (filteredDonations.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 10.dp),
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = SurfaceWhite
                        )
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(28.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Text(
                                text = "No ${
                                    selectedFilter.name.lowercase()
                                } donations",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = TextPrimary
                            )

                            Text(
                                text = "Your donations will appear here.",
                                fontSize = 12.sp,
                                color = TextSecondary
                            )
                        }
                    }
                }
            } else {
                items(
                    items = filteredDonations,
                    key = { it.donationRequestId }
                ) { donation ->

                    DonorDonationCard(
                        donation = donation,

                        onDetailsClick = {
                            detailsDonation = donation
                        },

                        onApproveClick = {
                            selectedDonation = donation
                            selectedAction = DonorAction.APPROVE
                        },

                        onCancelClick = {
                            selectedDonation = donation
                            selectedAction = DonorAction.CANCEL
                        }
                    )
                }
            }

            item {
                Spacer(modifier = Modifier.height(12.dp))
            }
        }
    }

    if (selectedDonation != null && selectedAction != null) {

        val donation = selectedDonation!!
        val action = selectedAction!!

        val title = when (action) {
            DonorAction.APPROVE -> "Approve Donation?"
            DonorAction.CANCEL -> "Cancel Donation?"
            DonorAction.DELETE -> "Delete Donation?"
        }

        val message = when (action) {
            DonorAction.APPROVE ->
                "Are you sure you want to approve the completion of this donation?"

            DonorAction.CANCEL ->
                "Are you sure you want to cancel this donation?"

            DonorAction.DELETE ->
                "Are you sure you want to delete this available donation?"
        }

        AlertDialog(
            onDismissRequest = {
                selectedDonation = null
                selectedAction = null
            },
            title = {
                Text(title, fontWeight = FontWeight.Bold)
            },
            text = {
                Text(message, color = TextSecondary)
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        val index = donations.indexOfFirst {
                            it.donationRequestId == donation.donationRequestId
                        }

                        if (index != -1) {
                            when (action) {
                                DonorAction.APPROVE -> {
                                    donations[index] = donations[index].copy(
                                        donationRequestStatus =
                                            DonationRequestStatus.COMPLETED
                                    )
                                }

                                DonorAction.CANCEL -> {
                                    donations[index] = donations[index].copy(
                                        donationRequestStatus =
                                            DonationRequestStatus.CANCELLED
                                    )
                                }

                                DonorAction.DELETE -> {
                                    donations.removeAt(index)
                                }
                            }
                        }

                        selectedDonation = null
                        selectedAction = null
                    }
                ) {
                    Text(
                        text = when (action) {
                            DonorAction.APPROVE -> "Approve"
                            DonorAction.CANCEL -> "Cancel Donation"
                            DonorAction.DELETE -> "Delete"
                        },
                        color = if (action == DonorAction.APPROVE) {
                            EmeraldPrimary
                        } else {
                            Color(0xFFD14343)
                        }
                    )
                }
            },
            dismissButton = {
                TextButton(
                    onClick = {
                        selectedDonation = null
                        selectedAction = null
                    }
                ) {
                    Text("Go Back", color = TextSecondary)
                }
            },
            containerColor = SurfaceWhite
        )
    }

    detailsDonation?.let { donation ->

        AlertDialog(
            onDismissRequest = {
                detailsDonation = null
            },
            title = {
                Text(
                    text = donation.foodItem.foodItemName,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
            },
            text = {
                Column(
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    DonationDetailRow(
                        "Donation ID",
                        donation.donationRequestId
                    )

                    DonationDetailRow(
                        "Food Type",
                        donation.foodItem.foodItemType.name
                    )

                    DonationDetailRow(
                        "Quantity",
                        "${donation.foodItem.quantity} ${donation.foodItem.quantityUnit.name}"
                    )

                    DonationDetailRow(
                        "Status",
                        donation.donationRequestStatus.name
                    )

                    DonationDetailRow(
                        "Cooking Time",
                        donation.foodItem.cookingTime ?: "Not provided"
                    )

                    DonationDetailRow(
                        "Expiry Time",
                        donation.foodItem.expiryTime ?: "Not provided"
                    )

                    DonationDetailRow(
                        "Oil Used",
                        donation.foodItem.oilUsed?.name ?: "Not provided"
                    )

                    Text(
                        text = "Ingredients",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = TextPrimary
                    )

                    Text(
                        text = donation.foodItem.ingridientsList
                            ?.joinToString(", ") ?: "Not provided",
                        fontSize = 12.sp,
                        color = TextSecondary
                    )

                    donation.claimedReceiverId?.let {
                        DonationDetailRow("Receiver ID", it)
                    }
                }
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        detailsDonation = null
                    }
                ) {
                    Text("Close", color = EmeraldPrimary)
                }
            },
            containerColor = SurfaceWhite
        )
    }
}

