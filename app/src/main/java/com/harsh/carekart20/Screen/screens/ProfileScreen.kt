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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.UserRole
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary
import androidx.compose.material.icons.filled.AccessTime
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.VerifiedUser
import androidx.compose.ui.graphics.vector.ImageVector

@Composable
fun ProfileScreen(
    userRole: UserRole,
    onNavigateBack: () -> Unit,
    onLogout: () -> Unit
) {
    val scrollState = rememberScrollState()

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
            colors = CardDefaults.cardColors(containerColor = EmeraldPrimary)
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
                        text = if (userRole == UserRole.DONOR) "D" else "R",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black,
                        color = EmeraldPrimary
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = if (userRole == UserRole.DONOR) "Green Leaf Restaurant" else "Asha Food Relief NGO",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = SurfaceWhite
                )

                Text(
                    text = if (userRole == UserRole.DONOR) "donor@carekart.org" else "receiver@carekart.org",
                    fontSize = 13.sp,
                    color = SurfaceWhite.copy(alpha = 0.8f)
                )

                Spacer(modifier = Modifier.height(10.dp))

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(SurfaceWhite.copy(alpha = 0.2f))
                        .padding(horizontal = 12.dp, vertical = 6.dp)
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

        // Profile Details Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
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

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.Business,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(20.dp)
                    )
                    Column(modifier = Modifier.padding(start = 12.dp)) {
                        Text("Organization Type", fontSize = 11.sp, color = TextSecondary)
                        Text(
                            if (userRole == UserRole.DONOR) "Licensed Restaurant / Food Mess" else "Registered NGO / Relief Trust",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.Phone,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(20.dp)
                    )
                    Column(modifier = Modifier.padding(start = 12.dp)) {
                        Text("Contact Phone", fontSize = 11.sp, color = TextSecondary)
                        Text("+91 98765 43210", fontSize = 13.sp, fontWeight = FontWeight.Medium)
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.LocationOn,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(20.dp)
                    )
                    Column(modifier = Modifier.padding(start = 12.dp)) {
                        Text("Registered Location", fontSize = 11.sp, color = TextSecondary)
                        Text(
                            "Malviya Nagar / Jagatpura, Jaipur",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Additional Organization Details Card
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
                    text = "Organization & Verification",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )

                ProfileDetailRow(
                    icon = Icons.Default.Person,
                    label = "Contact Person",
                    value = if (userRole == UserRole.DONOR)
                        "Restaurant Manager"
                    else
                        "NGO Coordinator"
                )

                ProfileDetailRow(
                    icon = Icons.Default.Restaurant,
                    label = if (userRole == UserRole.DONOR)
                        "Food Categories Donated"
                    else
                        "Food Categories Accepted",
                    value = if (userRole == UserRole.DONOR)
                        "Cooked Meals, Bakery, Groceries"
                    else
                        "Cooked Meals, Packaged Food, Groceries"
                )

                ProfileDetailRow(
                    icon = Icons.Default.AccessTime,
                    label = if (userRole == UserRole.DONOR)
                        "Donation Availability"
                    else
                        "Food Collection Hours",
                    value = if (userRole == UserRole.DONOR)
                        "10:00 AM - 8:00 PM"
                    else
                        "9:00 AM - 6:00 PM"
                )

                ProfileDetailRow(
                    icon = Icons.Default.VerifiedUser,
                    label = "Verification Status",
                    value = "Pending Verification"
                )

                ProfileDetailRow(
                    icon = Icons.Default.Business,
                    label = if (userRole == UserRole.DONOR)
                        "FSSAI License Number"
                    else
                        "NGO Registration Number",
                    value = if (userRole == UserRole.DONOR)
                        "Not Provided"
                    else
                        "Not Provided"
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))


        // Donation Statistics Card
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
                    text = if (userRole == UserRole.DONOR)
                        "Donation Impact"
                    else
                        "Food Received",
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
                        value = if (userRole == UserRole.DONOR)
                            "24" else "18",
                        modifier = Modifier.weight(1f)
                    )

                    ProfileStatItem(
                        title = "Meals",
                        value = if (userRole == UserRole.DONOR)
                            "320" else "240",
                        modifier = Modifier.weight(1f)
                    )

                    ProfileStatItem(
                        title = "This Month",
                        value = if (userRole == UserRole.DONOR)
                            "6" else "4",
                        modifier = Modifier.weight(1f)
                    )
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
                    Icons.Default.Logout,
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
            modifier = Modifier.padding(start = 12.dp)
        ) {
            Text(
                text = label,
                fontSize = 11.sp,
                color = TextSecondary
            )

            Text(
                text = value,
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
            .padding(vertical = 14.dp, horizontal = 6.dp),
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

