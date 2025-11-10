package com.example.myalbum.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Artiste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idArtiste;

    private String nomArtiste;
    private String descriptionArtiste;

    @OneToMany(mappedBy = "artiste")
    private List<Album> albums;
}
