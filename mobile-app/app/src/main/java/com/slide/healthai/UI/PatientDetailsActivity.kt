package com.slide.healthai.UI

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.slide.healthai.databinding.ActivityPatientDetailsBinding

class PatientDetailsActivity : AppCompatActivity() {
    private lateinit var binding: ActivityPatientDetailsBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var databaseReference: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPatientDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        databaseReference = FirebaseDatabase.getInstance().reference

        binding.logoutButton.setOnClickListener {
            auth.signOut()
            navigateToWelcome()
        }
        binding.helpbutton.setOnClickListener {
            startActivity(
                Intent(this, ProfessionalHelpActivity::class.java)
            )
        }

        fetchPatientDetails()
    }

    private fun fetchPatientDetails() {
        val currentUser = auth.currentUser
        currentUser?.email?.let { email ->
            // Start a query for the patient's email across all patient records
            databaseReference.child("patients")
                .orderByChild("email")
                .equalTo(email)
                .addListenerForSingleValueEvent(object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        if (dataSnapshot.exists()) {
                            // Since email is unique, we can expect only one record
                            dataSnapshot.children.firstOrNull()?.let { snapshot ->
                                // Get patient details from the snapshot
                                val name = snapshot.child("name").getValue(String::class.java) ?: "No Name"
                                val height = snapshot.child("height").getValue(Int::class.java)?.toString() ?: "No Height"
                                val weight = snapshot.child("weight").getValue(Int::class.java)?.toString() ?: "No Weight"
                                // ... fetch other details

                                // Update UI with patient details
                                binding.tvUserName.text = name
                                binding.tvUserEmail.text = email
                                binding.tvUserHeight.text = height
                                binding.tvUserWeight.text = weight
                            }
                        } else {
                            // Handle the case where the patient does not exist
                            binding.tvUserName.text = "No Name"
                            binding.tvUserEmail.text = "No Email"
                            binding.tvUserHeight.text = "Height: --"
                            binding.tvUserWeight.text = "Weight: --"
                        }
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                        // Handle error if the read failed
                        binding.tvUserName.text = "Error"
                        binding.tvUserEmail.text = "Error"
                        binding.tvUserHeight.text = "Error"
                        binding.tvUserWeight.text = "Error"
                    }
                })
        }
    }

    private fun navigateToWelcome() {
        val intent = Intent(this, WelcomeActivity::class.java)
        startActivity(intent)

        finish() // Close this activity
    }

}
