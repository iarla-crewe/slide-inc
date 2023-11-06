package com.slide.healthai.UI

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.slide.healthai.databinding.ActivitySignUpBinding

class SignUpActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySignUpBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSubmitSignUp.setOnClickListener {
            if (binding.etEmail.text == binding.etEmailConfirm.text) {
                // TODO - Handle emails not matching
            }

            if (binding.etPassword.text == binding.etEmailConfirm.text) {
                // TODO - Handle passwords not matching
            }

            val firstName = binding.etFirstName.text
            val lastName = binding.etLastName.text
            val phone = binding.etPhone.text
            val email = binding.etEmail.text
            val password = binding.etPassword.text

            // TODO - Handle signup

            startActivity(
                Intent(this, PaymentActivity::class.java)
            )
        }
    }
}
