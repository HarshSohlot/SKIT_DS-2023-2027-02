package com.harsh.carekart20.Model.Dto

data class LoginResponseDto(
    val accessToken : String,
    val refreshToken : String
)