package com.slide.healthai

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.slide.healthai.UI.LoginActivity
import com.slide.healthai.databinding.ActivityWelcomeBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWelcomeBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        // Setting up the logout button click listener
        binding.logoutButton.setOnClickListener { // Replace 'logoutButton' with your actual button ID
            FirebaseAuth.getInstance().signOut()
            navigateToLogin()
        }

        // Other initialization code
    }

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish() // To close the MainActivity after logging out
    }



    override fun onStart() {
        super.onStart()
        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = auth.currentUser
        if (currentUser != null) {
            // User is signed in
            updateUI(currentUser) // Implement this method to handle UI update
        } else {
            // No user is signed in
            // Redirect to LoginActivity
            navigateToLogin()
        }
    }

    private fun updateUI(user: FirebaseUser?) {
        // Update your UI with the information of the signed-in user
        // This could be showing user info, redirecting to another activity, etc.
    }
}
