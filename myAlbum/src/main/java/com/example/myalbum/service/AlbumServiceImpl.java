package com.example.myalbum.service;

import com.example.myalbum.entities.Album;
import com.example.myalbum.entities.Artiste;
import com.example.myalbum.repos.AlbumRepository;
import com.example.myalbum.repos.ArtisteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumServiceImpl implements AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtisteRepository artisteRepository;

    @Override
    public Album saveAlbum(Album a) {
        if (a.getArtiste() != null && a.getArtiste().getIdArtiste() != 0) {
            Artiste artiste = artisteRepository.findById(a.getArtiste().getIdArtiste())
                    .orElseThrow(() -> new RuntimeException("Artiste introuvable"));
            a.setArtiste(artiste);
        }
        return albumRepository.save(a);
    }

    @Override
    public Album updateAlbum(Album a) {
        return albumRepository.save(a);
    }

    @Override
    public void deleteAlbum(Album a) {
        albumRepository.delete(a);
    }

    @Override
    public void deleteAlbumById(Long id) {
        albumRepository.deleteById(id);
    }

    @Override
    public Album getAlbum(Long id) {
        return albumRepository.findById(id).orElse(null);
    }

    @Override
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @Override
    public List<Album> findByNomAlbum(String nom) {
        return albumRepository.findByNomAlbum(nom);
    }

    @Override
    public List<Album> findByNomAlbumContains(String nom) {
        return albumRepository.findByNomAlbumContains(nom);
    }

    @Override
    public List<Album> findByNomNbChansons(String nom, int nbChansons) {
        return albumRepository.findByNomNbChansons(nom, nbChansons);
    }

    @Override
    public List<Album> findByArtiste(Artiste artiste) {
        return albumRepository.findByArtiste(artiste);
    }

    @Override
    public List<Album> findByArtisteId(Long id) {
        return albumRepository.findByArtiste_IdArtiste(id);
    }

    @Override
    public List<Album> findByOrderByNomAlbumAsc() {
        return albumRepository.findByOrderByNomAlbumAsc();
    }

    @Override
    public List<Album> trierAlbumsNomsChansons() {
        return albumRepository.trierAlbumsNomsChansons();
    }
}
