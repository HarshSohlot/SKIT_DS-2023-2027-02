package com.harsh.carekart20.Model

data class User(
    val id: String,
    val name: String,
    val email: String,
    val role: UserRole,
    val organizationType: String = "",
    val phone: String = "",
    val address: String = "",
    val city: String = "Jaipur",
    val token: String = "",
    val mealsContributed: Int = 0
)