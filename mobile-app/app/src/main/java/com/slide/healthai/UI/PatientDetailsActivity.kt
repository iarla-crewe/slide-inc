package com.slide.healthai.UI

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.MenuItem
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.slide.healthai.R
import com.slide.healthai.databinding.ActivityPatientDetailsBinding

class PatientDetailsActivity : BaseActivity() {
    private lateinit var binding: ActivityPatientDetailsBinding
    private lateinit var databaseReference: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPatientDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        // Set the toolbar
        val toolbar: androidx.appcompat.widget.Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = "Your Profile"



        // No need to initialize auth here since it's already done in BaseActivity
        databaseReference = FirebaseDatabase.getInstance().reference


        fetchPatientDetails()
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_chat -> {
                // Code to navigate to the Chat Activity
                val intent = Intent(this, ChatActivity::class.java)
                startActivity(intent)
                true
            }
            R.id.menu_contact_insurance -> {
                openWebPage("https://www1.vhi.ie/help-and-support/contact") // Replace with actual URL
                true
            }
            R.id.menu_contact_gp -> {
                openWebPage("https://corkcitymedicalcentre.com/") // Replace with actual URL
                true
            }
            R.id.menu_logout -> {
                auth.signOut()
                navigateToLogin()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }


    override fun openWebPage(url: String) {
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
                                val heartPrediction = snapshot.child("heartPrediction").getValue(String::class.java)?.toString() ?: "No Data"
                                val lungPrediction = snapshot.child("lungPrediction").getValue(String::class.java)?.toString() ?: "No Data"

                                // Update UI with patient details
                                binding.tvUserName.text = name
                                binding.tvUserEmail.text = email
                                binding.tvUserHeight.text = height
                                binding.tvUserWeight.text = weight
                                binding.tvUserGender.text = gender
                                binding.tvHeartPrediction.text = heartPrediction
                                binding.tvLungPrediction.text = lungPrediction
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