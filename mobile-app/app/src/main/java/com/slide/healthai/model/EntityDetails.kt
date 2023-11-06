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

data class PatientDetails(
    val name: String,
    val age: Int,
    val gender: String,
    val height: Double,
    val weight: Double,
    val medicalHistory: String
)

