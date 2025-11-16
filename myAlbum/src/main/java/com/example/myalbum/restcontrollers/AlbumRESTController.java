package com.example.myalbum.restcontrollers;

import com.example.myalbum.entities.Album;
import com.example.myalbum.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AlbumRESTController {

  @Autowired
  private AlbumService albumService;

  // Récupérer tous les albums
  @RequestMapping(path = "all", method = RequestMethod.GET)
  public List<Album> getAllAlbums() {
    return albumService.getAllAlbums();
  }

  // Ajouter un nouvel album
  @RequestMapping(path = "addalbum", method = RequestMethod.POST)
  public Album createAlbum(@RequestBody Album album) {
    return albumService.saveAlbum(album);
  }

  // Récupérer un album par ID
  @RequestMapping(value = "getbyid/{id}", method = RequestMethod.GET)
  public Album getAlbumById(@PathVariable("id") Long id) {
    return albumService.getAlbum(id);
  }

  // Supprimer un album
  @RequestMapping(value = "delalbum/{id}", method = RequestMethod.DELETE)
  public void deleteAlbum(@PathVariable("id") Long id) {
    albumService.deleteAlbumById(id);
  }

  // Mettre à jour un album
  @RequestMapping(path = "updatealbum", method = RequestMethod.PUT)
  public Album updateAlbum(@RequestBody Album album) {
    return albumService.updateAlbum(album);
  }

  // Récupérer les albums par ID d'artiste
  @RequestMapping(value = "albumsart/{idArt}", method = RequestMethod.GET)
  public List<Album> getAlbumsByArtisteId(@PathVariable("idArt") Long idArt) {
    return albumService.findByArtisteId(idArt);
  }

  // Rechercher des albums par nom
  @RequestMapping(value = "albumsbynom/{nom}", method = RequestMethod.GET)
  public List<Album> findByNomAlbumContains(@PathVariable("nom") String nom) {
    return albumService.findByNomAlbumContains(nom);
  }
}
