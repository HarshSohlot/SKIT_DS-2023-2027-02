package com.harsh.carekart20.Navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.harsh.carekart20.Model.UserRole
import com.harsh.carekart20.Screen.screens.DonorDashboardScreen
import com.harsh.carekart20.Screen.screens.LoginScreen
import com.harsh.carekart20.Screen.screens.ProfileScreen
import com.harsh.carekart20.Screen.screens.ReceiverDashboardScreen
import com.harsh.carekart20.Screen.screens.RegisterScreen
import com.harsh.carekart20.Screen.screens.WelcomeScreen

@Composable
fun CareKartNavGraph(
    navController: NavHostController = rememberNavController()
) {
    // Current active logged-in user role state
    var currentUserRole by remember { mutableStateOf(UserRole.DONOR) }

    NavHost(
        navController = navController,
        startDestination = Screen.Welcome.route
    ) {
        // 1. Welcome Screen (Slide 5 Screen 1)
        composable(route = Screen.Welcome.route) {
            WelcomeScreen(
                onNavigateToLogin = {
                    navController.navigate(Screen.Login.route)
                },
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                }
            )
        }

        // 2. Login Screen (Slide 5 Screen 2)
        composable(route = Screen.Login.route) {
            LoginScreen(
                onNavigateBack = {
                    navController.popBackStack()
                },
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                },
                onLoginSuccess = { role ->
                    currentUserRole = role
                    if (role == UserRole.DONOR) {
                        navController.navigate(Screen.DonorDashboard.route) {
                            popUpTo(Screen.Welcome.route) { inclusive = true }
                        }
                    } else {
                        navController.navigate(Screen.ReceiverDashboard.route) {
                            popUpTo(Screen.Welcome.route) { inclusive = true }
                        }
                    }
                }
            )
        }

        // 3. Register Screen
        composable(route = Screen.Register.route) {
            RegisterScreen(
                onNavigateBack = {
                    navController.popBackStack()
                },
                onNavigateToLogin = {
                    navController.navigate(Screen.Login.route)
                },
                onRegisterSuccess = { role ->
                    currentUserRole = role
                    if (role == UserRole.DONOR) {
                        navController.navigate(Screen.DonorDashboard.route) {
                            popUpTo(Screen.Welcome.route) { inclusive = true }
                        }
                    } else {
                        navController.navigate(Screen.ReceiverDashboard.route) {
                            popUpTo(Screen.Welcome.route) { inclusive = true }
                        }
                    }
                }
            )
        }

        // 4. Donor Dashboard Screen
        composable(route = Screen.DonorDashboard.route) {
            DonorDashboardScreen(
                onNavigateToProfile = {
                    navController.navigate(Screen.Profile.route)
                }
            )
        }

        // 5. Receiver Dashboard Screen (Slide 5 Screen 3)
        composable(route = Screen.ReceiverDashboard.route) {
            ReceiverDashboardScreen(
                onNavigateToProfile = {
                    navController.navigate(Screen.Profile.route)
                }
            )
        }

        // 6. User Profile & Logout Screen
        composable(route = Screen.Profile.route) {
            ProfileScreen(
                userRole = currentUserRole,
                onNavigateBack = {
                    navController.popBackStack()
                },
                onLogout = {
                    navController.navigate(Screen.Welcome.route) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }
    }
}
