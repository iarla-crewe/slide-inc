package com.slide.healthai.UI

import android.os.Bundle
import com.slide.healthai.R

class PayActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment) // Use the correct layout file for PayActivity
        setupToolbar() // Initialize the toolbar
    }
}
