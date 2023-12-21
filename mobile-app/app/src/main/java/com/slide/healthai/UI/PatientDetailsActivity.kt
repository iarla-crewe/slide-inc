package com.slide.healthai.UI

import android.content.Intent
import android.net.Uri
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
        setupContactButtons()

        binding.btnNavigateToChat.setOnClickListener {
            val intent = Intent(this, ChatActivity::class.java)
            startActivity(intent)
        }

        auth = FirebaseAuth.getInstance()
        databaseReference = FirebaseDatabase.getInstance().reference

        binding.logoutButton.setOnClickListener {
            auth.signOut()
            navigateToLogin()
        }

        fetchPatientDetails()
    }

    private fun setupContactButtons() {
        binding.contactButton1.setOnClickListener {
            openWebPage("https://www1.vhi.ie/help-and-support/contact") // Replace with your first URL
        }

        binding.contactButton2.setOnClickListener {
            openWebPage("https://www.corkcitymedicalcentre.com/") // Replace with your second URL
        }
    }

    private fun openWebPage(url: String) {
        val webPage: Uri = Uri.parse(url)
        val intent = Intent(Intent.ACTION_VIEW, webPage)
        if (intent.resolveActivity(packageManager) != null) {
            startActivity(intent)
        }
    }


    private fun fetchPatientDetails() {
        val currentUser = auth.currentUser
        currentUser?.email?.let { email ->
            databaseReference.child("patients")
                .orderByChild("email")
                .equalTo(email)
                .addListenerForSingleValueEvent(object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        if (dataSnapshot.exists()) {
                            dataSnapshot.children.firstOrNull()?.let { snapshot ->
                                val name = snapshot.child("name").getValue(String::class.java) ?: "No Name"
                                val height = snapshot.child("height").getValue(Int::class.java)?.toString() ?: "No Height"
                                val weight = snapshot.child("weight").getValue(Int::class.java)?.toString() ?: "No Weight"
                                val genderBoolean = snapshot.child("sex").getValue(Boolean::class.java)
                                val gender = if (genderBoolean == true) "Male" else "Female"

                                // Update UI with patient details
                                binding.tvUserName.text = name
                                binding.tvUserEmail.text = email
                                binding.tvUserHeight.text = height
                                binding.tvUserWeight.text = weight
                                binding.tvUserGender.text = gender
                            }
                        } else {
                            showNoData()
                        }
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                        showNoData()
                    }
                })
        }
    }

    //adding a comment to test git

    private fun showNoData() {
        binding.tvUserName.text = "No Name"
        binding.tvUserEmail.text = "No Email"
        binding.tvUserHeight.text = "Height: --"
        binding.tvUserWeight.text = "Weight: --"
        binding.tvUserGender.text = "Gender: --"
    }

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

}