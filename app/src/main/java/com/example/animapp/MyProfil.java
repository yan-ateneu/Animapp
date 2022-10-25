package com.example.animapp;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class MyProfil extends AppCompatActivity {

    private TextView TextView_NrPostari;
    private TextView TextView_NrUrmaritori;
    private TextView TextView_NrUrmareste;
    private TextView TextView_NumeProfil;
    private TextView TextView_Descriere;
    private TextView TextView_Categorie;
    private ImageView mImageView;
    private Button mButon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_myprofil);

        String url = "http://10.0.2.2:3000";
       RequestQueue requestQueue_date=Volley.newRequestQueue(this);
       JsonObjectRequest request =new JsonObjectRequest(Request.Method.GET, url,null, new Response.Listener<JSONObject>() {
           @Override
           public void onResponse(JSONObject response) {
                try {
                    JSONObject obj = new JSONObject(String.valueOf(response));
                    int nrUrmaritori = obj.getInt("NrUrmaritori");
                    TextView_NrUrmaritori = findViewById(R.id.urmaritori);
                    TextView_NrUrmaritori.setText(nrUrmaritori + "");

                    int nrPostari = obj.getInt("NrPostari");
                    TextView_NrPostari = findViewById(R.id.nr_postari);
                    TextView_NrPostari.setText(nrPostari + "");

                    int nrUrmareste = obj.getInt("NrUrmareste");
                    TextView_NrUrmareste = findViewById(R.id.urmareste);
                    TextView_NrUrmareste.setText(nrUrmareste + "");

                    String numeProfil = obj.getString("NumeProfil");
                    TextView_NumeProfil = findViewById(R.id.numeProfil);
                    TextView_NumeProfil.setText(numeProfil + "");

                    String descriere = obj.getString("Descriere");
                    TextView_Descriere = findViewById(R.id.descriere);
                    TextView_Descriere.setText(descriere + "");

                    String categorie = obj.getString("Categorie");
                    TextView_Categorie = findViewById(R.id.categorie);
                    TextView_Categorie.setText(categorie + "");

                    String locatiePozaProfil = obj.getString("LocatiePozaProfil");
                    Log.d("poza", locatiePozaProfil);
                    }catch (JSONException e) {
                    e.printStackTrace();
                }
           }
       }, new Response.ErrorListener() {
           @Override
           public void onErrorResponse(VolleyError error) {

           }
       });

        requestQueue_date.add(request);

        mImageView = findViewById(R.id.imagineprofil);
        mButon=findViewById(R.id.buton_poza);
        String url_poza = "http://10.0.2.2:3000/Profil/Poza";
        mButon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestImage();
            }
        });

    }

    private void requestImage() {
        RequestQueue requestQueue=Volley.newRequestQueue(this);

        ImageRequest imageRequest = new ImageRequest("http://10.0.2.2:3000/profil/poza", new com.android.volley.Response.Listener<Bitmap>() {
            @Override
            public void onResponse(Bitmap response) {
                mImageView.setImageBitmap(response);
            }
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, null, new com.android.volley.Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        requestQueue.add(imageRequest);

    }
        public void onClick1(View v) {
            Intent intent=new Intent(this,Urmaritori.class);
            startActivity(intent);
        }
    public void onClick2(View v) {
        Intent intent=new Intent(this,Urmareste.class);
        startActivity(intent);
    }
}