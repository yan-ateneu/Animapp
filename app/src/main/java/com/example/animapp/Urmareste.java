package com.example.animapp;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Urmareste extends AppCompatActivity{
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
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Pandemie", R.drawable.sym_def_app_icon));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Hilohi", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Yan", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Kataron", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Marinas", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Coco", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Mirciu", R.drawable.gfgimage));
        profilUrmarModelArrayList.add(new ProfilUrmarModel("Plama", R.drawable.gfgimage));


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
