package com.example.myalbum.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAlbum;

    private String nomAlbum;
    private String genre;
    private Date dateSortie;
    private String nbChansons;
    @ManyToOne
    @JoinColumn(name = "id_artiste")
    @JsonIgnoreProperties("albums")
    private Artiste artiste;

    public Album() {
        super();
    }

    public Album(String nbChansons, Date dateSortie, String genre, String nomAlbum) {
        this.nbChansons = nbChansons;
        this.dateSortie = dateSortie;
        this.genre = genre;
        this.nomAlbum = nomAlbum;
    }

    public long getIdAlbum() {
        return idAlbum;
    }

    public void setIdAlbum(long idAlbum) {
        this.idAlbum = idAlbum;
    }

    public String getNomAlbum() {
        return nomAlbum;
    }

    public void setNomAlbum(String nomAlbum) {
        this.nomAlbum = nomAlbum;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Date getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(Date dateSortie) {
        this.dateSortie = dateSortie;
    }

    public String getNbChansons() {
        return nbChansons;
    }

    public void setNbChansons(String nbChansons) {
        this.nbChansons = nbChansons;
    }


    @Override
    public String toString() {
        return "Album{" +
                "idAlbum=" + idAlbum +
                ", nomAlbum='" + nomAlbum + '\'' +
                ", genre='" + genre + '\'' +
                ", dateSortie=" + dateSortie +
                ", nbChansons='" + nbChansons + '\'' +
                '}';
    }

    public Artiste getArtiste() {
        return artiste;
    }

    public void setArtiste(Artiste artiste) {
        this.artiste = artiste;
    }
}
