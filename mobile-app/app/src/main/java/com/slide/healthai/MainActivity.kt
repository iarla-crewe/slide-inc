package com.slide.healthai

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.welcome_page)

        val loginButton = findViewById<Button>(R.id.loginButton)
        val signUpButton = findViewById<Button>(R.id.signUpButton)

        loginButton.setOnClickListener {
            val loginIntent = Intent(this, LoginActivity::class.java)
            startActivity(loginIntent)
        }

        signUpButton.setOnClickListener {
            val signUpIntent = Intent(this, SignUpActivity::class.java)
            startActivity(signUpIntent)
        }

//        val button = findViewById<Button>(R.id.button)
//        button.setOnClickListener {
//            val Intent = Intent(this,MainActivity2::class.java)
//            startActivity(Intent)
//        }
//
//        val button1 = findViewById<Button>(R.id.button1)
//        button1.setOnClickListener {
//            val Intent = Intent(this,MainActivity3::class.java)
//            startActivity(Intent)
//        }
//
//        val button2 = findViewById<Button>(R.id.button2)
//        button2.setOnClickListener {
//            val Intent = Intent(this, MainActivity4::class.java)
//            startActivity(Intent)
//        }
    }
}
