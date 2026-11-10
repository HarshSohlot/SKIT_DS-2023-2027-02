package com.harsh.carekart20.Screen.Components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccessTime
import androidx.compose.material.icons.filled.Fastfood
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.DonationRequest
import com.harsh.carekart20.Model.Enum.DonationRequestStatus
import com.harsh.carekart20.ui.theme.*

@Composable
fun DonorDonationCard(
    donation: DonationRequest,
    onDetailsClick: () -> Unit,
    onApproveClick: () -> Unit,
    onCancelClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val status = donation.donationRequestStatus

    val statusColor = when (status) {
        DonationRequestStatus.AVAILABLE -> EmeraldPrimary
        DonationRequestStatus.CLAIMED -> Color(0xFFB7791F)
        DonationRequestStatus.COMPLETED -> Color(0xFF2876B9)
        DonationRequestStatus.CANCELLED -> Color(0xFF757575)
        DonationRequestStatus.EXPIRED -> Color(0xFFDC2626)
    }

    val statusBackground = when (status) {
        DonationRequestStatus.AVAILABLE -> EmeraldContainer
        DonationRequestStatus.CLAIMED -> Color(0xFFFFF1D6)
        DonationRequestStatus.COMPLETED -> Color(0xFFE3F2FD)
        DonationRequestStatus.CANCELLED -> Color(0xFFEEEEEE)
        DonationRequestStatus.EXPIRED -> Color(0xFFFEE2E2)
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onDetailsClick() },
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(
            containerColor = SurfaceWhite
        ),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 2.dp
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            // Food name and status
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(14.dp))
                        .background(EmeraldContainer),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Fastfood,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(25.dp)
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(3.dp)
                ) {
                    Text(
                        text = donation.foodItem.foodItemName,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )

                    Text(
                        text = donation.donationRequestId,
                        fontSize = 11.sp,
                        color = TextSecondary
                    )
                }

                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = statusBackground
                ) {
                    Text(
                        text = status.name.lowercase()
                            .replaceFirstChar { it.uppercase() },
                        color = statusColor,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(
                            horizontal = 10.dp,
                            vertical = 6.dp
                        )
                    )
                }
            }

            // Food information
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                InfoChip(
                    text = donation.foodItem.foodItemType.name
                )

                InfoChip(
                    text = "${donation.foodItem.quantity} ${
                        donation.foodItem.quantityUnit.name
                    }"
                )
            }

            // Expiry information
            donation.foodItem.expiryTime?.let { expiry ->
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.AccessTime,
                        contentDescription = null,
                        tint = AmberAccent,
                        modifier = Modifier.size(15.dp)
                    )

                    Spacer(modifier = Modifier.width(5.dp))

                    Text(
                        text = "Expires: $expiry",
                        fontSize = 11.sp,
                        color = TextSecondary
                    )
                }
            }

            // Receiver information
            if (status == DonationRequestStatus.CLAIMED) {
                HorizontalDivider(
                    color = Color(0xFFEEEEEE)
                )

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Person,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(17.dp)
                    )

                    Spacer(modifier = Modifier.width(6.dp))

                    Text(
                        text = "Claimed by: ${
                            donation.claimedReceiverId ?: "Receiver"
                        }",
                        fontSize = 12.sp,
                        color = TextPrimary,
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            HorizontalDivider(
                color = Color(0xFFEEEEEE)
            )

            // Status-specific actions
            when (status) {

                DonationRequestStatus.AVAILABLE -> {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        TextButton(
                            onClick = onDetailsClick
                        ) {
                            Text(
                                "View Details",
                                color = EmeraldPrimary
                            )
                        }

                        TextButton(
                            onClick = onCancelClick
                        ) {
                            Text(
                                "Cancel",
                                color = Color(0xFFD14343)
                            )
                        }
                    }
                }

                DonationRequestStatus.CLAIMED -> {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text(
                            text = "This donation has been claimed.",
                            fontSize = 11.sp,
                            color = TextSecondary
                        )

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Button(
                                onClick = onApproveClick,
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = EmeraldPrimary
                                )
                            ) {
                                Text(
                                    "Approve",
                                    fontSize = 12.sp
                                )
                            }

                            OutlinedButton(
                                onClick = onCancelClick,
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp)
                            ) {
                                Text(
                                    "Cancel",
                                    color = Color(0xFFD14343),
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }
                }

                DonationRequestStatus.COMPLETED -> {
                    Text(
                        text = "Donation successfully completed.",
                        color = EmeraldPrimary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                }

                DonationRequestStatus.CANCELLED -> {
                    Text(
                        text = "This donation has been cancelled.",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                DonationRequestStatus.EXPIRED -> {
                    Text(
                        text = "This donation has been expired.",
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun InfoChip(
    text: String
) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFFF1F5F9))
            .padding(horizontal = 10.dp, vertical = 6.dp)
    ) {
        Text(
            text = text,
            fontSize = 11.sp,
            fontWeight = FontWeight.Medium,
            color = TextPrimary
        )
    }
}
