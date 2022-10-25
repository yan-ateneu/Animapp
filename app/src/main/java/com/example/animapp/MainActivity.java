package com.example.animapp;

import android.os.Bundle;

import androidx.fragment.app.FragmentActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.google.android.material.bottomnavigation.BottomNavigationView;


public class MainActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView navView = findViewById(R.id.bottomNav_view);

        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_profile, R.id.navigation_search)
                .build();



//        btnprofile = findViewById(R.id.buttonProfil);
//        btnprofile.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                openMyProfile();
//            }
//        });

    }

//    public void openMyProfile(){
//        Intent intent=new Intent(this,MyProfil.class);
//        startActivity(intent);
//    }
}
