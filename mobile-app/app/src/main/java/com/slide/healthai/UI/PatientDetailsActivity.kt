package com.slide.healthai.UI

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.AuthFailureError
import com.android.volley.DefaultRetryPolicy
import com.android.volley.NetworkResponse
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.slide.healthai.databinding.ActivityPatientDetailsBinding
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

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
            navigateToLogin()
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

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish() // Close this activity
    }

    // ChatGPT integration

    private var stringOutput: String = ""
    private lateinit var textView: TextView
    val stringAPIKey = "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"
    val stringURLEndPoint = "https://api.openai.com/v1/chat/completions"

    fun buttonChatGPT(view: View) {

        val jsonObject = JSONObject()

        try {
            jsonObject.put("model", "gpt-3.5-turbo")

            val jsonArrayMessage = JSONArray()
            val jsonObjectMessage = JSONObject()
            jsonObjectMessage.put("role", "user")
            jsonObjectMessage.put("content", "Write a poem about clouds")
            jsonArrayMessage.put(jsonObjectMessage)

            jsonObject.put("messages", jsonArrayMessage)
        } catch (e: JSONException) {
            throw RuntimeException(e)
        }

        val jsonObjectRequest = object : JsonObjectRequest(
            Request.Method.POST, stringURLEndPoint, jsonObject,
            Response.Listener { response ->
                if (response != null) {
                    // Response received from the API
                    val stringText: String? = try {
                        response.getJSONArray("choices")
                            .getJSONObject(0)
                            .getJSONObject("message")
                            .getString("content")
                    } catch (e: JSONException) {
                        null // Handle JSON parsing error
                    }

                    if (stringText != null) {
                        // Display the received text
                        stringOutput += stringText
                        textView.text = stringOutput
                    } else {
                        // Handle the case where the response doesn't contain the expected data
                        Log.e("API Response", "Unexpected or missing data in the API response")
                    }
                } else {
                    // Handle the case where no response is received
                    Log.e("API Response", "No response received from the API")
                }
            },
            Response.ErrorListener { error ->
                if (error is VolleyError) {
                    if (error.networkResponse != null) {
                        val statusCode = error.networkResponse.statusCode
                        val errorMessage = String(error.networkResponse.data)
                        Log.e(
                            "Volley Error",
                            "Status Code: $statusCode, Error Message: $errorMessage"
                        )

                        // You can display a message to the user or take other actions based on the error.
                    } else {
                        Log.e("Volley Error", "Network response is null")
                        // Handle other types of Volley errors
                    }
                } else {
                    Log.e("Volley Error", "Non-Volley error: ${error.localizedMessage}")
                    // Handle non-Volley errors
                }
            }
        ) {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {
                val mapHeader = HashMap<String, String>()
                mapHeader["Authorization"] = "Bearer $stringAPIKey"
                mapHeader["Content-Type"] = "application/json"
                return mapHeader
            }

            override fun parseNetworkResponse(response: NetworkResponse): Response<JSONObject> {
                return super.parseNetworkResponse(response)
            }
        }

        val intTimeoutPeriod = 60000 // 60 seconds timeout duration defined
        val retryPolicy = DefaultRetryPolicy(
            intTimeoutPeriod,
            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT
        )
        jsonObjectRequest.retryPolicy = retryPolicy
        Volley.newRequestQueue(applicationContext).add(jsonObjectRequest)
    }
}
