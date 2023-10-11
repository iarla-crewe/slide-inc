package com.slide.healthai

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.slide.healthai.databinding.ActivityLoginBinding
import java.util.logging.Logger

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSubmitLogin.setOnClickListener {
            val email = binding.etEmail.text
            val password = binding.etPassword.text
            Log.d("LOGIN", "$email, $password")

            startActivity(
                Intent(this, HealthAIPageActivity::class.java)
            )
        }
    }
}
