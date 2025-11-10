package com.example.myalbum.restcontrollers;

import com.example.myalbum.entities.Album;
import com.example.myalbum.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AlbumRESTController {

    @Autowired
    private AlbumService albumService;

    //Recuperer tous les albums
    @GetMapping
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    // Ajouter un new album
    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumService.saveAlbum(album);
    }

    // Recuperer un album par ID
    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id) {
        return albumService.getAlbum(id);
    }

    // delete  album
    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbumById(id);
    }

    // Update un album
    @PutMapping("/{id}")
    public Album updateAlbum(@RequestBody Album album) {
        return albumService.updateAlbum(album);
    }

    @RequestMapping(value="/albumArt/{idArt}", method = RequestMethod.GET)
    public List<Album> getAlbumsByArtisteId(@PathVariable("idArt") Long idCat) {
        return albumService.findByArtisteId(idCat);
    }

    @RequestMapping(value="/artistebyalbum/{nom}",method = RequestMethod.GET)
    public List<Album> findByNomProduitContains(@PathVariable("nom") String nom) {
        return albumService.findByNomAlbumContains(nom);
    }

}
