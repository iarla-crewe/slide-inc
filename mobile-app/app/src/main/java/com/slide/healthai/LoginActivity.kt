package com.slide.healthai

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login_page)

        val loginFullyButton = findViewById<Button>(R.id.loginFullyButton)

        loginFullyButton.setOnClickListener {

            val healthAIPageIntent = Intent(this, HealthAIPageActivity::class.java)
            startActivity(healthAIPageIntent)
        }
    }
}
