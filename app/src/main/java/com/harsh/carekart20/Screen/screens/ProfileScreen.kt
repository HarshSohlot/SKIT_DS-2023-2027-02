package com.harsh.carekart20.Screen.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.ReportProblem
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.Dto.ProfileUiData
import com.harsh.carekart20.Model.UserRole
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary

@Composable
fun ProfileScreen(
    userRole: UserRole,
    profile: ProfileUiData,
    onNavigateBack: () -> Unit,
    onLogout: () -> Unit
) {
    val scrollState = rememberScrollState()

    val isDonor = userRole == UserRole.DONOR

    val historyLabel = if (isDonor) {
        "Donations Made"
    } else {
        "Donations Received"
    }

    val issueLabel = if (isDonor) {
        "Faulty Donations"
    } else {
        "Cancelled Requests"
    }

    val locationText = buildString {
        append(profile.address)

        if (!profile.landmark.isNullOrBlank()) {
            append(", ")
            append(profile.landmark)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .verticalScroll(scrollState)
            .padding(24.dp)
    ) {

        // Back Button
        IconButton(
            onClick = onNavigateBack,
            modifier = Modifier.padding(top = 8.dp)
        ) {
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                contentDescription = "Back",
                tint = TextPrimary
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Profile Avatar Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = EmeraldPrimary
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(76.dp)
                        .clip(CircleShape)
                        .background(SurfaceWhite),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = profile.name
                            .trim()
                            .firstOrNull()
                            ?.uppercase() ?: "U",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black,
                        color = EmeraldPrimary
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = profile.name,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = SurfaceWhite
                )

                Text(
                    text = profile.email,
                    fontSize = 13.sp,
                    color = SurfaceWhite.copy(alpha = 0.8f)
                )

                Spacer(modifier = Modifier.height(10.dp))

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(SurfaceWhite.copy(alpha = 0.2f))
                        .padding(
                            horizontal = 12.dp,
                            vertical = 6.dp
                        )
                ) {
                    Text(
                        text = userRole.label.uppercase(),
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Black,
                        color = SurfaceWhite
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Account Details Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(
                containerColor = SurfaceWhite
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Account Details",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )

                ProfileDetailRow(
                    icon = Icons.Default.Badge,
                    label = if (isDonor) "Donor ID" else "Receiver ID",
                    value = profile.userId
                )

                ProfileDetailRow(
                    icon = Icons.Default.Business,
                    label = if (isDonor) "Donor Type" else "Receiver Type",
                    value = profile.organizationType
                )

                ProfileDetailRow(
                    icon = Icons.Default.Phone,
                    label = "Contact Phone",
                    value = profile.phoneNumber
                )

                ProfileDetailRow(
                    icon = Icons.Default.LocationOn,
                    label = "Registered Location",
                    value = locationText
                )

                ProfileDetailRow(
                    icon = Icons.Default.LocationOn,
                    label = "Coordinates",
                    value = "${profile.latitude}, ${profile.longitude}"
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Organization Details Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(
                containerColor = SurfaceWhite
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Organization Details",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )

                ProfileDetailRow(
                    icon = Icons.Default.Person,
                    label = if (isDonor) {
                        "Owner / Contact Person"
                    } else {
                        "Organization Name"
                    },
                    value = profile.contactPersonOrOrganization
                )

                ProfileDetailRow(
                    icon = Icons.Default.Business,
                    label = "Registration Number",
                    value = profile.registrationNumber
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Donation History Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(
                containerColor = SurfaceWhite
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Donation History",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )

                ProfileDetailRow(
                    icon = Icons.Default.History,
                    label = historyLabel,
                    value = profile.totalDonations.toString()
                )

                ProfileDetailRow(
                    icon = Icons.Default.ReportProblem,
                    label = issueLabel,
                    value = profile.issueCount.toString()
                )

                ProfileDetailRow(
                    icon = Icons.Default.Restaurant,
                    label = "Recorded History Entries",
                    value = profile.donationHistory.size.toString()
                )

                if (profile.donationHistory.isNotEmpty()) {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Text(
                            text = "Recent History",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = TextSecondary
                        )

                        profile.donationHistory.forEach { entry ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.Top
                            ) {
                                Box(
                                    modifier = Modifier
                                        .padding(top = 5.dp)
                                        .size(7.dp)
                                        .clip(CircleShape)
                                        .background(EmeraldPrimary)
                                )

                                Text(
                                    text = entry,
                                    modifier = Modifier.padding(start = 10.dp),
                                    fontSize = 13.sp,
                                    color = TextPrimary
                                )
                            }
                        }
                    }
                } else {
                    Text(
                        text = "No donation history available.",
                        fontSize = 13.sp,
                        color = TextSecondary
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Statistics Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(
                containerColor = SurfaceWhite
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = if (isDonor) {
                        "Donation Impact"
                    } else {
                        "Food Received"
                    },
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    ProfileStatItem(
                        title = "Total",
                        value = profile.totalDonations.toString(),
                        modifier = Modifier.weight(1f)
                    )

                    ProfileStatItem(
                        title = "History",
                        value = profile.donationHistory.size.toString(),
                        modifier = Modifier.weight(1f)
                    )

                    ProfileStatItem(
                        title = "Rating",
                        value = "%.1f".format(
                            profile.rating
                        ),
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Logout Button
        Button(
            onClick = onLogout,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFFEE2E2),
                contentColor = Color(0xFFDC2626)
            )
        ) {
            Icon(
                imageVector = Icons.Default.Logout,
                contentDescription = "Logout",
                modifier = Modifier.size(18.dp)
            )

            Text(
                text = "Sign Out of CareKart",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 8.dp)
            )
        }

        Spacer(modifier = Modifier.height(20.dp))
    }
}

@Composable
fun ProfileDetailRow(
    icon: ImageVector,
    label: String,
    value: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = EmeraldPrimary,
            modifier = Modifier.size(20.dp)
        )

        Column(
            modifier = Modifier
                .padding(start = 12.dp)
                .weight(1f)
        ) {
            Text(
                text = label,
                fontSize = 11.sp,
                color = TextSecondary
            )

            Text(
                text = value.ifBlank { "Not provided" },
                fontSize = 13.sp,
                fontWeight = FontWeight.Medium,
                color = TextPrimary
            )
        }
    }
}

@Composable
fun ProfileStatItem(
    title: String,
    value: String,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFFF8FAFC))
            .padding(
                vertical = 14.dp,
                horizontal = 6.dp
            ),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value,
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = EmeraldPrimary
        )

        Text(
            text = title,
            fontSize = 11.sp,
            color = TextSecondary
        )
    }
}