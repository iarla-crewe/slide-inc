package com.slide.healthai.UI

import android.os.Bundle
import com.slide.healthai.R

class ReviewActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_review) // Use the correct layout file for ReviewActivity
        setupToolbar() // Initialize the toolbar
    }
}
