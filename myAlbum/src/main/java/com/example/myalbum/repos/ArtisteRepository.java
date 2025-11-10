package com.example.myalbum.repos;

import com.example.myalbum.entities.Artiste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "artiste")
@CrossOrigin("http://localhost:4200/")
@Repository
public interface ArtisteRepository extends JpaRepository<Artiste, Long> {
    // Tu peux ajouter des méthodes personnalisées plus tard, par ex :
    // List<Artiste> findByNomArtiste(String nom);
}
