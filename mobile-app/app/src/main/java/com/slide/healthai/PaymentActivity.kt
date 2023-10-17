package com.slide.healthai

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class PaymentActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.payment_page)

        val submitButton = findViewById<Button>(R.id.submitButton)

        submitButton.setOnClickListener {
            val healthAIPageIntent = Intent(this, HealthAIPageActivity::class.java)
            startActivity(healthAIPageIntent)
        }
    }
}
