package com.harsh.carekart20.Model.Dto

data class LoginRequestDto(
    val userId : String,
    val password : String,
    val userType : String
)
