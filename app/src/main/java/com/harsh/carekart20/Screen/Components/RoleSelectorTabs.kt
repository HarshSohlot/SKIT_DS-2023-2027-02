package com.harsh.carekart20.Screen.Components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.LocationCity
import androidx.compose.material3.Icon
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

@Composable
fun RoleSelectorTabs(
    selectedRole: UserRole,
    onRoleSelected: (UserRole) -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0xFFF1F5F9))
            .padding(4.dp)
    ) {
        Row(modifier = Modifier.fillMaxWidth()) {
            // Donor Tab
            val isDonor = selectedRole == UserRole.DONOR
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(if (isDonor) SurfaceWhite else Color.Transparent)
                    .clickable { onRoleSelected(UserRole.DONOR) }
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Favorite,
                        contentDescription = null,
                        tint = if (isDonor) EmeraldPrimary else TextSecondary,
                        modifier = Modifier.padding(end = 6.dp)
                    )
                    Text(
                        text = "Donor",
                        fontSize = 14.sp,
                        fontWeight = if (isDonor) FontWeight.Bold else FontWeight.Medium,
                        color = if (isDonor) EmeraldPrimary else TextPrimary
                    )
                }
            }

            // Receiver Tab
            val isReceiver = selectedRole == UserRole.RECEIVER
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(if (isReceiver) SurfaceWhite else Color.Transparent)
                    .clickable { onRoleSelected(UserRole.RECEIVER) }
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.LocationCity,
                        contentDescription = null,
                        tint = if (isReceiver) EmeraldPrimary else TextSecondary,
                        modifier = Modifier.padding(end = 6.dp)
                    )
                    Text(
                        text = "Receiver",
                        fontSize = 14.sp,
                        fontWeight = if (isReceiver) FontWeight.Bold else FontWeight.Medium,
                        color = if (isReceiver) EmeraldPrimary else TextPrimary
                    )
                }
            }
        }
    }
}
