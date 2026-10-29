package com.harsh.carekart20.Screen.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.harsh.carekart20.Model.Dto.LoginRequestDto
import com.harsh.carekart20.Model.UserRole
import com.harsh.carekart20.Screen.Components.CareKartButton
import com.harsh.carekart20.Screen.Components.CareKartTextField
import com.harsh.carekart20.Screen.Components.RoleSelectorTabs
import com.harsh.carekart20.ui.theme.EmeraldPrimary
import com.harsh.carekart20.ui.theme.SurfaceWhite
import com.harsh.carekart20.ui.theme.TextPrimary
import com.harsh.carekart20.ui.theme.TextSecondary


@Composable
fun LoginScreen(
    onNavigateBack: () -> Unit,
    onNavigateToRegister: () -> Unit,
    onLoginSuccess: (UserRole) -> Unit,
    onNavigateToForgotPassword : ()->Unit
) {
    var selectedRole by remember { mutableStateOf(UserRole.DONOR) }
    var userId by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isPasswordVisible by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }

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

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Welcome Back",
            fontSize = 28.sp,
            fontWeight = FontWeight.Black,
            color = TextPrimary
        )

        Text(
            text = "Login to continue",
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(top = 4.dp)
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Role Selector Tabs (Donor | Receiver)
        RoleSelectorTabs(
            selectedRole = selectedRole,
            onRoleSelected = { selectedRole = it }
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Quick Viva Demo Autofill Bar
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(Color(0xFFECFDF5))
                .padding(12.dp)
        ) {
            Column {
                Text(
                    text = "Demo: Quick Fill",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = EmeraldPrimary
                )
                Spacer(modifier = Modifier.height(6.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = {
                            selectedRole = UserRole.DONOR
                            userId = "donor101"
                            password = "donor101"
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.weight(1f).height(34.dp)
                    ) {
                        Text("Donor Demo", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }

                    Button(
                        onClick = {
                            selectedRole = UserRole.RECEIVER
                            userId = "receiver101"
                            password = "receiver101"
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFD97706)),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.weight(1f).height(34.dp)
                    ) {
                        Text("Receiver Demo", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // UserId Text Field
        CareKartTextField(
            value = userId,
            onValueChange = {
                userId = it
                errorMessage = null
            },
            label = if(selectedRole == UserRole.DONOR) "DonorId" else "ReceiverId" ,
            placeholder = if (selectedRole == UserRole.DONOR) "donor101" else "receiver101",
            leadingIcon = Icons.Default.AccountCircle,
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Password Text Field
        CareKartTextField(
            value = password,
            onValueChange = {
                password = it
                errorMessage = null
            },
            label = "Password",
            placeholder = "••••••••",
            leadingIcon = Icons.Default.Lock,
            visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            trailingIcon = {
                IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
                    Icon(
                        imageVector = if (isPasswordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                        contentDescription = "Toggle password visibility",
                        tint = TextSecondary
                    )
                }
            }
        )

        // Forgot Password Link
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 10.dp),
            contentAlignment = Alignment.CenterEnd
        ) {
            Text(
                text = "Forgot Password?",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = EmeraldPrimary,
                modifier = Modifier.clickable {
                    onNavigateToForgotPassword()
                }
            )
        }

        if (errorMessage != null) {
            Text(
                text = errorMessage!!,
                color = Color(0xFFEF4444),
                fontSize = 12.sp,
                modifier = Modifier.padding(top = 10.dp)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Login Button
        CareKartButton(
            text = "Login",
            isLoading = isLoading,
            onClick = {
                if (userId.isBlank() || password.isBlank()) {
                    errorMessage = "Please enter email and password"
                    return@CareKartButton
                }
                isLoading = true
                // Login api call to backend
                when(selectedRole){
                    UserRole.DONOR -> {
                        val loginRequest = LoginRequestDto(
                            userId = userId,
                            password = password,
                            userType = "DONOR"
                        )
                        // backend api integration
                    }
                    UserRole.RECEIVER -> {
                        val loginRequest = LoginRequestDto(
                            userId = userId,
                            password = password,
                            userType = "RECEIVER"
                        )
                        // backend api integration
                    }
                    UserRole.ADMIN -> {
                        val loginRequest = LoginRequestDto(
                            userId = userId,
                            password = password,
                            userType = "ADMIN"
                        )
                        // backend api integration after admin registration
                    }
                }
                onLoginSuccess(selectedRole)
            }
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Sign Up Footer Link (matching Slide 5 Screen 2)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Don't have an account? ",
                fontSize = 13.sp,
                color = TextSecondary
            )
            Text(
                text = "Sign Up",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = EmeraldPrimary,
                modifier = Modifier.clickable { onNavigateToRegister() }
            )
        }
    }
}
