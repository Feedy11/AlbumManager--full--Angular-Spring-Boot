package com.example.myalbum.repos;

import com.example.myalbum.entities.Album;
import com.example.myalbum.entities.Artiste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "rest")
public interface AlbumRepository extends JpaRepository<Album, Long> {

    List<Album> findByNomAlbum(String nomAlbum);
    List<Album> findByNomAlbumContains(String nomAlbum);

    @Query("SELECT a FROM Album a WHERE a.nomAlbum LIKE %?1% AND a.nbChansons > ?2")
    List<Album> findByNomNbChansons(String nom, int nbChansons);

    @Query("select a from Album a where a.artiste = ?1")
    List<Album> findByArtiste(Artiste artiste);

    List<Album> findByArtiste_IdArtiste(Long idArtiste);

    List<Album> findByOrderByNomAlbumAsc();

    @Query("select a from Album a order by a.nomAlbum ASC, a.nbChansons DESC")
    List<Album> trierAlbumsNomsChansons();
}
