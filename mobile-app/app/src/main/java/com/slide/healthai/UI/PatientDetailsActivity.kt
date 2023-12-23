package com.slide.healthai.UI

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.MenuItem
import android.widget.TextView
import androidx.core.content.ContextCompat
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
        val toolbar: androidx.appcompat.widget.Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = "Your Profile"

        databaseReference = FirebaseDatabase.getInstance().reference
        fetchPatientDetails()

        binding.btnShare.setOnClickListener {
            shareHealthScore()
        }
    }

    private fun shareHealthScore() {
        val shareText = "My Health Score: ${binding.tvHealthScore.text}"
        val shareIntent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, shareText)
            type = "text/plain"
        }
        startActivity(Intent.createChooser(shareIntent, "Share via"))
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_chat -> {
                val intent = Intent(this, ChatActivity::class.java)
                startActivity(intent)
                true
            }
            R.id.menu_contact_insurance -> {
                openWebPage("https://www1.vhi.ie/help-and-support/contact")
                true
            }
            R.id.menu_contact_gp -> {
                openWebPage("https://corkcitymedicalcentre.com/")
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
                                val strokePrediction = snapshot.child("strokePrediction").getValue(String::class.java)?.toString() ?: "No Data"

                                // Update UI with patient details
                                binding.tvUserName.text = name
                                binding.tvUserEmail.text = email
                                binding.tvUserHeight.text = height
                                binding.tvUserWeight.text = weight
                                binding.tvUserGender.text = gender

                                // Set text and color for predictions
                                setTextAndColor(binding.tvHeartPrediction, heartPrediction, false)
                                setTextAndColor(binding.tvLungPrediction, lungPrediction, false)
                                setTextAndColor(binding.tvStrokePrediction, strokePrediction, false)

                                val healthScore = calculateHealthScore(heartPrediction, lungPrediction, strokePrediction)
                                binding.tvHealthScore.text = "Health Score: $healthScore%"
                                setTextAndColor(binding.tvHealthScore, healthScore.toString(), true)
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

    private fun setTextAndColor(textView: TextView, prediction: String, isHealthScore: Boolean) {
        textView.text = prediction
        val score = prediction.removeSuffix("%").toFloatOrNull() ?: 0f
        val textColor = if (isHealthScore) {
            when {
                score >= 80 -> R.color.green
                score >= 60 -> R.color.orange
                else -> R.color.red
            }
        } else {
            when {
                score <= 20 -> R.color.green
                score <= 40 -> R.color.orange
                else -> R.color.red
            }
        }
        textView.setTextColor(ContextCompat.getColor(this, textColor))
    }

    private fun calculateHealthScore(heartPred: String, lungPred: String, strokePred: String): Float {
        val heartValue = heartPred.removeSuffix("%").toFloatOrNull() ?: 0f
        val lungValue = lungPred.removeSuffix("%").toFloatOrNull() ?: 0f
        val strokeValue = strokePred.removeSuffix("%").toFloatOrNull() ?: 0f

        val average = (heartValue + lungValue + strokeValue) / 3
        return (100 - average)
    }

    private fun showNoData() {
        binding.tvUserName.text = "No Name"
        binding.tvUserEmail.text = "No Email"
        binding.tvUserHeight.text = "Height: --"
        binding.tvUserWeight.text = "Weight: --"
        binding.tvUserGender.text = "Gender: --"
        setDefaultTextAndColor(binding.tvHeartPrediction, "Heart Prediction: --")
        setDefaultTextAndColor(binding.tvLungPrediction, "Lung Prediction: --")
        setDefaultTextAndColor(binding.tvStrokePrediction, "Stroke Prediction: --")
        setDefaultTextAndColor(binding.tvHealthScore, "Health Score: --")
    }

    private fun setDefaultTextAndColor(textView: TextView, text: String) {
        textView.text = text
        textView.setTextColor(ContextCompat.getColor(this, R.color.tertiaryColor)) // Default color
    }

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }
}
