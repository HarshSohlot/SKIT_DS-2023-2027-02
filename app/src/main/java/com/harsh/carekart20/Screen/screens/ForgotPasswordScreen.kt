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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.LockReset
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.UserRole
import com.harsh.carekart20.Screen.Components.CareKartButton
import com.harsh.carekart20.Screen.Components.CareKartTextField
import com.harsh.carekart20.Screen.Components.RoleSelectorTabs
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary

@Composable
fun ForgotPasswordScreen(
    onNavigateBack: () -> Unit,
    onSubmit: (String, UserRole) -> Unit
) {
    var selectedRole by remember {
        mutableStateOf(UserRole.DONOR)
    }

    var userId by remember {
        mutableStateOf("")
    }

    var isLoading by remember {
        mutableStateOf(false)
    }

    var errorMessage by remember {
        mutableStateOf<String?>(null)
    }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(SurfaceWhite)
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

        Spacer(modifier = Modifier.height(24.dp))

        // Header Icon
        Icon(
            imageVector = Icons.Default.LockReset,
            contentDescription = "Reset Password",
            tint = EmeraldPrimary,
            modifier = Modifier
                .padding(bottom = 16.dp)
                .height(48.dp)
        )

        // Heading
        Text(
            text = "Forgot Password?",
            fontSize = 28.sp,
            fontWeight = FontWeight.Black,
            color = TextPrimary
        )

        Text(
            text = "Don't worry! Enter your registered User ID " +
                    "and we'll help you reset your password.",
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(top = 8.dp)
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Role Selector
        RoleSelectorTabs(
            selectedRole = selectedRole,
            onRoleSelected = {
                selectedRole = it
                errorMessage = null
            }
        )

        Spacer(modifier = Modifier.height(24.dp))

        // User ID Field
        CareKartTextField(
            value = userId,
            onValueChange = {
                userId = it
                errorMessage = null
            },
            label = "User ID",
            placeholder = if (selectedRole == UserRole.DONOR) {
                "donor101"
            } else {
                "receiver101"
            },
            leadingIcon = Icons.Default.AccountCircle
        )

        // Error Message
        if (errorMessage != null) {
            Text(
                text = errorMessage!!,
                color = Color(0xFFEF4444),
                fontSize = 12.sp,
                modifier = Modifier.padding(top = 10.dp)
            )
        }

        Spacer(modifier = Modifier.height(28.dp))

        // Reset Password Button
        CareKartButton(
            text = "Reset Password",
            isLoading = isLoading,
            onClick = {
                if (userId.isBlank()) {
                    errorMessage = "Please enter your registered User ID"
                } else {
                    errorMessage = null
                    onSubmit(userId.trim(), selectedRole)
                }
            }
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Back to Login Footer
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Remember your password? ",
                fontSize = 13.sp,
                color = TextSecondary
            )

            Text(
                text = "Login",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = EmeraldPrimary,
                modifier = Modifier
                    .padding(start = 4.dp)
            )
        }
    }
}
