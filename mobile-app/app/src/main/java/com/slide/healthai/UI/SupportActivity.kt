package com.slide.healthai.UI

import android.os.Bundle
import com.slide.healthai.databinding.ActivitySupportBinding

class SupportActivity : BaseActivity() {
    private lateinit var binding: ActivitySupportBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySupportBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupToolbar() // Initialize the toolbar
    }
}
