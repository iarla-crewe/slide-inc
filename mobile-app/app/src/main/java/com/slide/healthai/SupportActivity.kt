package com.slide.healthai

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.slide.healthai.databinding.ActivitySupportBinding

class SupportActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySupportBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySupportBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}