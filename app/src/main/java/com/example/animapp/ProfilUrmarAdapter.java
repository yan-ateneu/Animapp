package com.example.animapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class ProfilUrmarAdapter extends RecyclerView.Adapter<ProfilUrmarAdapter.Viewholder> {

    private Context context;
    private ArrayList<ProfilUrmarModel> profilUrmarModelArrayList;

    // Constructor
    public ProfilUrmarAdapter(Context context, ArrayList<ProfilUrmarModel> courseModelArrayList) {
        this.context = context;
        this.profilUrmarModelArrayList = courseModelArrayList;
    }

    @NonNull
    @Override
    public ProfilUrmarAdapter.Viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // to inflate the layout for each item of recycler view.
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.profil_urmar, parent, false);
        return new Viewholder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProfilUrmarAdapter.Viewholder holder, int position) {
        // to set data to textview and imageview of each card layout
        ProfilUrmarModel model = profilUrmarModelArrayList.get(position);
        holder.profilNAME.setText(model.getProfil_name());
        holder.profilIM.setImageResource(model.getProfil_image());
    }

    @Override
    public int getItemCount() {
        // this method is used for showing number
        // of card items in recycler view.
        return profilUrmarModelArrayList.size();
    }

    public class Viewholder extends RecyclerView.ViewHolder {
        private ImageView profilIM;
        private TextView profilNAME;

        public Viewholder(@NonNull View itemView) {
            super(itemView);
            profilIM = itemView.findViewById(R.id.idProfilUrmarImage);
            profilNAME = itemView.findViewById(R.id.idProfilUrmarName);
        }
    }
}