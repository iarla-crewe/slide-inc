package com.slide.healthai

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
import com.slide.healthai.databinding.ActivityHomeBinding
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class HomeActivity : AppCompatActivity() {

    private var stringOutput: String = ""
    private lateinit var textView: TextView
    val stringAPIKey = "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"
    val stringURLEndPoint = "https://api.openai.com/v1/chat/completions"

    private lateinit var binding: ActivityHomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)


    }

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