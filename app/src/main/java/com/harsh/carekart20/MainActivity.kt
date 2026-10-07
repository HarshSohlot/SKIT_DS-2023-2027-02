package com.harsh.carekart20

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.harsh.carekart20.Navigation.CareKartNavGraph
import com.harsh.carekart20.ui.theme.CareKartTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CareKartTheme {
                CareKartNavGraph()
            }
        }
    }
}
