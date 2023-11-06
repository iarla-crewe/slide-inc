package com.slide.healthai.UI

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.slide.healthai.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSubmitLogin.setOnClickListener {
            val email = binding.etEmail.text
            val password = binding.etPassword.text

            // TODO - Handle login

            startActivity(
                Intent(this, HomeActivity::class.java)
            )
        }
    }
}
