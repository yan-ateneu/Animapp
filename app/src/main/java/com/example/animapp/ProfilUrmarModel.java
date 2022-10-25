package com.example.animapp;

public class ProfilUrmarModel {
    private String profil_name;
    private int profil_image;

    public ProfilUrmarModel(String profil_name, int profil_image){
        this.profil_name=profil_name;
        this.profil_image=profil_image;
    }
    public String getProfil_name() {
        return profil_name;
    }

    public void setProfil_name(String profil_name) {
        this.profil_name = profil_name;
    }

    public int getProfil_image() {
        return profil_image;
    }

    public void setProfil_image(int profil_image) {
        this.profil_image = profil_image;
    }

}
