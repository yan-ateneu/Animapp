package com.example.animapp;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Urmaritori extends AppCompatActivity{
    private RecyclerView profilUrmRV;

    // Arraylist for storing data
    private ArrayList<ProfilUrmarModel> profilUrmarModelArrayList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recview_urm);
        profilUrmRV = findViewById(R.id.idRVProfileUrm);

        // here we have created new array list and added data to it.
       profilUrmarModelArrayList = new ArrayList<>();
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Tapirdea", R.drawable.sym_def_app_icon));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Cazacu", R.drawable.gfgimage));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Balescu", R.drawable.gfgimage));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Cezara", R.drawable.gfgimage));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Borcan", R.drawable.gfgimage));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Zanoaga", R.drawable.gfgimage));
       profilUrmarModelArrayList.add(new ProfilUrmarModel("Pinteala", R.drawable.gfgimage));

        // we are initializing our adapter class and passing our arraylist to it.
        ProfilUrmarAdapter profilUrmarAdapter = new ProfilUrmarAdapter(this,profilUrmarModelArrayList);

        // below line is for setting a layout manager for our recycler view.
        // here we are creating vertical list so we will provide orientation as vertical
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);

        // in below two lines we are setting layoutmanager and adapter to our recycler view.
        profilUrmRV.setLayoutManager(linearLayoutManager);
        profilUrmRV.setAdapter(profilUrmarAdapter);
    }
}
