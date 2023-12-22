package com.slide.healthai.UI

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.google.firebase.auth.FirebaseAuth
import com.slide.healthai.R

abstract class BaseActivity : AppCompatActivity() {

    protected lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        auth = FirebaseAuth.getInstance()

        // No setContentView here because this is an abstract class
        // setContentView should be called in the subclasses of BaseActivity
    }

    // This assumes that each activity that extends BaseActivity will have a toolbar with the same ID
    protected fun setupToolbar() {
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
    }

    protected fun navigateToProfile() {
        val intent = Intent(this, PatientDetailsActivity::class.java)
        startActivity(intent)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_chat -> {
                navigateToChat()
                true
            }
            R.id.menu_your_profile -> {
                navigateToProfile()
                true
            }
            R.id.menu_contact_insurance -> {
                openWebPage("https://www1.vhi.ie/help-and-support/contact")
                true
            }
            R.id.menu_contact_gp -> {
                openWebPage("https://www.corkcitymedicalcentre.com")
                true
            }
            R.id.menu_logout -> {
                logout()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    protected fun navigateToChat() {
        val intent = Intent(this, ChatActivity::class.java)
        startActivity(intent)
    }

    protected open fun openWebPage(url: String) {
        val webPage: Uri = Uri.parse(url)
        val intent = Intent(Intent.ACTION_VIEW, webPage)
        if (intent.resolveActivity(packageManager) != null) {
            startActivity(intent)
        }
    }

    protected fun logout() {
        auth.signOut()
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

    // Additional common methods for BaseActivity...
}
