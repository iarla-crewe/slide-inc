package com.slide.healthai.model

data class GpDetails(
    val name: String,
    val practiceName: String,
    val mobileNumber: String
)

data class InsuranceCompanyDetails(
    val name: String,
    val phoneNumber: String,
    val website: String
)

data class Patient(
    val email: String = "",
    val encryptedPassword: String = "",
    val gpPhone: String = "",
    val height: Int = 0,
    val name: String = "",
    val policyNumber: Long = 0L,
    val sex: Boolean = false,
    val weight: Int = 0
)


