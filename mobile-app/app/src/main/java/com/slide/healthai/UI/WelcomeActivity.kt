package com.slide.healthai

// ... [other imports]
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.FirebaseApp.initializeApp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.slide.healthai.databinding.ActivityWelcomeBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWelcomeBinding
    private lateinit var database: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize Firebase
        initializeApp(this)

        // Specify the doctor's phone number
        val doctorPhoneNumber = "+353873459811" // Replace with actual doctor's phone number

        // Create a reference to the doctor's patients in Firebase Realtime Database
        database = FirebaseDatabase.getInstance("")
            .getReference("doctors")
            .child(doctorPhoneNumber)
            .child("patients")

        // Read from the database
        database.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                val value = dataSnapshot.value
                Log.d("TAG", "Value is: $value")
            }

            override fun onCancelled(databaseError: DatabaseError) {
                // Failed to read value
                Log.w("TAG", "Failed to read value.", databaseError.toException())
            }
        })
    }
}
