package com.harsh.carekart20.Screen.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.VolunteerActivism
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import com.harsh.carekart20.Model.FoodDonation
import com.harsh.carekart20.Screen.Components.CareKartBottomBar
import com.harsh.carekart20.Screen.Components.CareKartButton
import com.harsh.carekart20.Screen.Components.CareKartTextField
import com.harsh.carekart20.Screen.Components.FoodListingCard
import com.harsh.carekart20.ui.theme.EmeraldContainer
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary

@Composable
fun DonorDashboardScreen(
    onNavigateToProfile: () -> Unit
) {
    var showAddDialog by remember { mutableStateOf(false) }
    var foodName by remember { mutableStateOf("") }
    var quantity by remember { mutableStateOf("") }

    val myDonations = remember {
        mutableStateListOf(
            FoodDonation(
                id = "DON-101",
                title = "Fresh Veg Biryani & Raita",
                category = "Cooked Rice / Biryani",
                donorName = "My Restaurant",
                quantity = "25 Portions",
                distance = "0 km (Your Location)",
                pickupLocation = "Malviya Nagar, Jaipur",
                cookedTime = "Today, 2:00 PM",
                predictedExpiryHours = 6.0f,
                safetyScore = 92f,
                status = "AVAILABLE"
            ),
            FoodDonation(
                id = "DON-102",
                title = "Dal Makhani & Roti",
                category = "Dal & Lentils",
                donorName = "My Restaurant",
                quantity = "40 Portions",
                distance = "0 km (Your Location)",
                pickupLocation = "Malviya Nagar, Jaipur",
                cookedTime = "Today, 1:00 PM",
                predictedExpiryHours = 4.5f,
                safetyScore = 88f,
                status = "CLAIMED"
            )
        )
    }

    Scaffold(
        bottomBar = {
            CareKartBottomBar(
                currentRoute = "donor_dashboard",
                onNavigate = { route ->
                    if (route == "profile") onNavigateToProfile()
                },
                onAddFoodClick = { showAddDialog = true }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
                .padding(paddingValues)
                .padding(horizontal = 20.dp)
        ) {
            // Header Bar
            item {
                Spacer(modifier = Modifier.height(16.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Donor Dashboard",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Black,
                            color = TextPrimary
                        )
                        Text(
                            text = "Green Leaf Restaurant (Jaipur)",
                            fontSize = 13.sp,
                            color = TextSecondary
                        )
                    }

                    IconButton(
                        onClick = onNavigateToProfile,
                        modifier = Modifier
                            .size(44.dp)
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
                Spacer(modifier = Modifier.height(20.dp))
            }

            // Impact Summary Card
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = EmeraldPrimary)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Your Community Impact",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = SurfaceWhite
                            )
                            Icon(
                                imageVector = Icons.Default.VolunteerActivism,
                                contentDescription = null,
                                tint = SurfaceWhite
                            )
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text(
                                    text = "860",
                                    fontSize = 28.sp,
                                    fontWeight = FontWeight.Black,
                                    color = SurfaceWhite
                                )
                                Text(
                                    text = "Meals Shared",
                                    fontSize = 12.sp,
                                    color = SurfaceWhite.copy(alpha = 0.8f)
                                )
                            }
                            Column {
                                Text(
                                    text = "340 kg",
                                    fontSize = 28.sp,
                                    fontWeight = FontWeight.Black,
                                    color = SurfaceWhite
                                )
                                Text(
                                    text = "CO2 Prevented",
                                    fontSize = 12.sp,
                                    color = SurfaceWhite.copy(alpha = 0.8f)
                                )
                            }
                            Column {
                                Text(
                                    text = "${myDonations.size}",
                                    fontSize = 28.sp,
                                    fontWeight = FontWeight.Black,
                                    color = SurfaceWhite
                                )
                                Text(
                                    text = "Active Listings",
                                    fontSize = 12.sp,
                                    color = SurfaceWhite.copy(alpha = 0.8f)
                                )
                            }
                        }
                    }
                }
                Spacer(modifier = Modifier.height(24.dp))
            }

            // Section Header
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "My Posted Donations",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                    Text(
                        text = "${myDonations.size} active",
                        fontSize = 12.sp,
                        color = EmeraldPrimary,
                        fontWeight = FontWeight.Bold
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
            }

            // Items List
            items(myDonations) { donation ->
                FoodListingCard(
                    donation = donation,
                    onClaimClick = { /* Donor view: details */ }
                )
            }

            item {
                Spacer(modifier = Modifier.height(30.dp))
            }
        }
    }

    // Add Food Dialog (matching Slide 5 Screen 4)
    if (showAddDialog) {
        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            title = {
                Text("Add Food Donation", fontWeight = FontWeight.Bold, fontSize = 18.sp)
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    CareKartTextField(
                        value = foodName,
                        onValueChange = { foodName = it },
                        label = "Food Name",
                        placeholder = "e.g. Mixed Veg Curry & Rice"
                    )
                    CareKartTextField(
                        value = quantity,
                        onValueChange = { quantity = it },
                        label = "Quantity (Portions)",
                        placeholder = "e.g. 30 Portions"
                    )
                    Text(
                        text = "AI Expiry Engine will evaluate shelf life using Harshit's Random Forest model upon submission.",
                        fontSize = 11.sp,
                        color = TextSecondary
                    )
                }
            },
            confirmButton = {
                CareKartButton(
                    text = "Post Donation",
                    onClick = {
                        if (foodName.isNotBlank() && quantity.isNotBlank()) {
                            myDonations.add(
                                0,
                                FoodDonation(
                                    id = "DON-${System.currentTimeMillis() % 1000}",
                                    title = foodName,
                                    category = "Cooked Meal",
                                    donorName = "My Restaurant",
                                    quantity = quantity,
                                    distance = "0 km (Your Location)",
                                    pickupLocation = "Malviya Nagar, Jaipur",
                                    cookedTime = "Just now",
                                    predictedExpiryHours = 5.0f,
                                    safetyScore = 95f,
                                    status = "AVAILABLE"
                                )
                            )
                            showAddDialog = false
                            foodName = ""
                            quantity = ""
                        }
                    }
                )
            },
            dismissButton = {
                TextButton(onClick = { showAddDialog = false }) {
                    Text("Cancel", color = TextSecondary)
                }
            }
        )
    }
}
