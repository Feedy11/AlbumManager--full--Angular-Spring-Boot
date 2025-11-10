package com.example.myalbum.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomAlbum", types = {Album.class})
public interface AlbumProjection {
    public String getNomAlbum();
}
