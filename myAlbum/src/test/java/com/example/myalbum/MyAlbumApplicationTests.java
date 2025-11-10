package com.example.myalbum;

import com.example.myalbum.entities.Album;
import com.example.myalbum.entities.Artiste;
import com.example.myalbum.repos.AlbumRepository;
import com.example.myalbum.repos.ArtisteRepository;
import com.example.myalbum.service.AlbumService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

@SpringBootTest
class AlbumApplicationTests {

    @Autowired
    private AlbumService albumService;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtisteRepository artisteRepository; // ✅ injecte ton repo artiste

    @Test
    public void testCreateAlbum() {
        // Créer et sauvegarder un artiste
        Artiste artiste = new Artiste();
        artiste.setNomArtiste("the weekend");
        artiste.setDescriptionArtiste("the weekend");
        artiste = artisteRepository.save(artiste);

        //  Créer un album lié à cet artiste
        Album album = new Album();
        album.setNomAlbum("25");
        album.setGenre("Pop");
        album.setDateSortie(new Date());
        album.setNbChansons("11");
        album.setArtiste(artiste); // 🔗 association

        // Sauvegarder l’album
        albumService.saveAlbum(album);
        System.out.println("✅ Album créé : " + album.getNomAlbum() +
                " | Artiste : " + album.getArtiste().getNomArtiste());
    }

    @Test
    public void testFindAlbum() {
        Album a = albumService.getAlbum(1L);
        System.out.println(a);
    }

    @Test
    public void testUpdateAlbum() {
        Album a = albumService.getAlbum(1L);
        if (a != null) {
            a.setNbChansons("15");
            albumService.updateAlbum(a);
            System.out.println("Album mis à jour : " + a);
        }
    }

    @Test
    public void testFindByNomAlbumContains() {
        List<Album> albums = albumService.findByNomAlbumContains("t");
        for (Album a : albums) {
            System.out.println(a);
        }
    }

    @Test
    public void testFindByNomNbChansons() {
        List<Album> albums = albumService.findByNomNbChansons("t", 5);
        for (Album a : albums) {
            System.out.println(a);
        }
    }

    @Test
    public void testFindByArtisteId() {
        List<Album> albums = albumService.findByArtisteId(1L);
        for (Album a : albums) {
            System.out.println(a);
        }
    }

    @Test
    public void testTrierAlbumsNomsChansons() {
        List<Album> albums = albumService.trierAlbumsNomsChansons();
        for (Album a : albums) {
            System.out.println(a);
        }
    }

    @Test
    public void testFindByNomAlbum() {
        List<Album> albums = albumService.findByNomAlbum("thirds");
        for (Album a : albums) {
            System.out.println(a);
        }
    }

    @Test
    public void testGetAllAlbums() {
        List<Album> albums = albumService.getAllAlbums();
        for (Album a : albums) {
            System.out.println(a);
        }
    }
}
