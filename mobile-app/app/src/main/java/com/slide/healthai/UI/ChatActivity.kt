package com.slide.healthai.UI

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.android.volley.AuthFailureError
import com.android.volley.DefaultRetryPolicy
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.slide.healthai.BuildConfig
import com.slide.healthai.R
import com.slide.healthai.databinding.ActivityChatBinding
import org.json.JSONArray
import org.json.JSONObject


class ChatActivity : BaseActivity() {
    private lateinit var binding: ActivityChatBinding
    private val stringAPIKey = BuildConfig.API_KEY
    private val stringURLEndPoint = "https://api.openai.com/v1/chat/completions"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChatBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val toolbar: androidx.appcompat.widget.Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = "ChatBot"
        Log.d("ChatActivity", "API Key: $stringAPIKey")

        binding.btnSendChat.setOnClickListener {
            sendChatMessage()
        }
    }

    private fun sendChatMessage() {
        val userMessage = binding.etChatInput.text.toString().trim()
        if (userMessage.isEmpty()) {
            Toast.makeText(this, "Please enter a message.", Toast.LENGTH_SHORT).show()
            return
        }

        // Show generating message
        binding.tvChatResponse.append("\nYou: $userMessage\nGenerating...")

        // Clear the input field for new message
        binding.etChatInput.text.clear()

        val jsonObject = JSONObject()
        try {
            jsonObject.put("model", "gpt-3.5-turbo")

            val jsonArrayMessages = JSONArray()
            val jsonObjectMessage = JSONObject().apply {
                put("role", "user")
                put("content", userMessage)
            }
            jsonArrayMessages.put(jsonObjectMessage)

            jsonObject.put("messages", jsonArrayMessages)
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "Failed to create JSON for API request.", Toast.LENGTH_SHORT).show()
            return
        }

        val jsonObjectRequest = object : JsonObjectRequest(
            Request.Method.POST, stringURLEndPoint, jsonObject,
            Response.Listener { response ->
                // Clear the generating message
                binding.tvChatResponse.text = binding.tvChatResponse.text.toString().replace("Generating...", "")
                handleChatResponse(response)
            },
            Response.ErrorListener { error ->
                Log.e("ChatError", "Error: ${error.localizedMessage}")
                Toast.makeText(this, "Failed to send message.", Toast.LENGTH_SHORT).show()
            }
        ) {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer $stringAPIKey"
                headers["Content-Type"] = "application/json"
                return headers
            }
        }

        jsonObjectRequest.retryPolicy = DefaultRetryPolicy(
            60000,
            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT
        )

        Volley.newRequestQueue(this).add(jsonObjectRequest)
    }

    private fun handleChatResponse(response: JSONObject) {
        Log.d("ChatResponse", response.toString()) // Log the full response

        try {
            // Correctly extract the "content" from the nested "message" object
            val messageContent = response.getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content")

            // Append the message content to the TextView
            binding.tvChatResponse.append("\nAssistant: $messageContent")
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "Failed to parse the response: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
        }
    }
}
