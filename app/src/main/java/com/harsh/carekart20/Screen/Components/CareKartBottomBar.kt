package com.harsh.carekart20.Screen.Components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.PersonOutline
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextSecondary

@Composable
fun CareKartBottomBar(
    currentRoute: String,
    onNavigate: (String) -> Unit,
    onAddFoodClick: () -> Unit
) {
    NavigationBar(
        containerColor = SurfaceWhite,
        tonalElevation = 8.dp
    ) {
        NavigationBarItem(
            icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
            label = { Text("Home", fontSize = 10.sp) },
            selected = currentRoute.contains("dashboard") || currentRoute == "home",
            onClick = { onNavigate("home") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldPrimary,
                selectedTextColor = EmeraldPrimary,
                indicatorColor = Color(0xFFD1FAE5)
            )
        )

        NavigationBarItem(
            icon = { Icon(Icons.Default.Assignment, contentDescription = "My Requests") },
            label = { Text("Requests", fontSize = 10.sp) },
            selected = false,
            onClick = { /* Navigate to Requests */ },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldPrimary,
                unselectedIconColor = TextSecondary
            )
        )

        // Center Action (+) Button matching Slide 5
        NavigationBarItem(
            icon = {
                FloatingActionButton(
                    onClick = onAddFoodClick,
                    shape = CircleShape,
                    containerColor = EmeraldPrimary,
                    contentColor = SurfaceWhite,
                    modifier = Modifier.size(42.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Add Food")
                }
            },
            label = { Text("Add Food", fontSize = 10.sp) },
            selected = false,
            onClick = onAddFoodClick
        )

        NavigationBarItem(
            icon = { Icon(Icons.Default.ChatBubbleOutline, contentDescription = "Messages") },
            label = { Text("Messages", fontSize = 10.sp) },
            selected = false,
            onClick = { /* Navigate to Messages */ },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldPrimary,
                unselectedIconColor = TextSecondary
            )
        )

        NavigationBarItem(
            icon = { Icon(Icons.Default.PersonOutline, contentDescription = "Profile") },
            label = { Text("Profile", fontSize = 10.sp) },
            selected = currentRoute == "profile",
            onClick = { onNavigate("profile") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldPrimary,
                selectedTextColor = EmeraldPrimary,
                indicatorColor = Color(0xFFD1FAE5)
            )
        )
    }
}
