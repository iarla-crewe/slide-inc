package com.slide.healthai.UI

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.slide.healthai.MainActivity
import com.slide.healthai.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        binding.btnSubmitLogin.setOnClickListener {
            val email = binding.etEmail.text.toString()
            val password = binding.etPassword.text.toString()

            auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        // Sign in success
                        Log.d("LoginActivity", "signInWithEmail:success")
                        val user = auth.currentUser
                        updateUI(user) // Implement this method to update UI and navigate
                    } else {
                        // If sign in fails
                        Log.w("LoginActivity", "signInWithEmail:failure", task.exception)
                        Toast.makeText(baseContext, "Authentication failed.", Toast.LENGTH_SHORT).show()
                        updateUI(null)
                    }
                }
        }
    }

    private fun updateUI(user: FirebaseUser?) {
        // Update your UI based on user object
        if (user != null) {
            // Navigate to MainActivity or your home activity
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // Finish this activity so the user can't navigate back to it
        } else {
            // Optionally, handle UI changes when sign-in fails
        }

    }



}
