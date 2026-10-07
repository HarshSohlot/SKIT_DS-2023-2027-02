package com.harsh.carekart20.Navigation

sealed class Screen(val route: String) {
    data object Welcome : Screen("welcome")
    data object Login : Screen("login")
    data object Register : Screen("register")
    data object DonorDashboard : Screen("donor_dashboard")
    data object ReceiverDashboard : Screen("receiver_dashboard")
    data object Profile : Screen("profile")
}