package com.example.myalbum.service;

import com.example.myalbum.entities.Album;
import com.example.myalbum.entities.Artiste;

import java.util.List;

public interface AlbumService {

    Album saveAlbum(Album a);
    Album updateAlbum(Album a);
    void deleteAlbum(Album a);
    void deleteAlbumById(Long id);
    Album getAlbum(Long id);

    List<Album> getAllAlbums();

    List<Album> findByNomAlbum(String nom);
    List<Album> findByNomAlbumContains(String nom);
    List<Album> findByNomNbChansons(String nom, int nbChansons);
    List<Album> findByArtiste(Artiste artiste);
    List<Album> findByArtisteId(Long id);

    List<Album> findByOrderByNomAlbumAsc();
    List<Album> trierAlbumsNomsChansons();
}