package com.slide.healthai.UI

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.FirebaseApp.initializeApp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.slide.healthai.databinding.ActivityPaymentBinding

class DBActivity : AppCompatActivity() {
    private lateinit var binding: ActivityPaymentBinding



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPaymentBinding.inflate(layoutInflater)
        setContentView(binding.root)


        // Firebase Initialization
        initializeApp(this)

        // Create a reference to your Firebase Realtime Database
        val database = FirebaseDatabase.getInstance("https://health-ai-9e1c9-default-rtdb.europe-west1.firebasedatabase.app")
        val myRef = database.getReference("Patients")

        // Read from the database
        myRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                val value = dataSnapshot.value
                Log.d("TAG", "Value is: $value")
            }

            override fun onCancelled(error: DatabaseError) {
                Log.w("TAG", "Failed to read value.", error.toException())
            }
        })
    }

}



