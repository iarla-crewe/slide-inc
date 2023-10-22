package com.slide.healthai

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.slide.healthai.databinding.ActivityProfessionalHelpBinding

class ProfessionalHelpActivity : AppCompatActivity() {
    private lateinit var binding: ActivityProfessionalHelpBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfessionalHelpBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}