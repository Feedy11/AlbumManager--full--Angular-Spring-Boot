package com.example.myalbum.restcontrollers;

import com.example.myalbum.entities.Artiste;
import com.example.myalbum.repos.ArtisteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/art")
@CrossOrigin(origins = "http://localhost:4200")
public class ArtisteRESTController {

    @Autowired
    private ArtisteRepository artisteRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Artiste> getAllArtistes() {
        return artisteRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Artiste getArtisteById(@PathVariable("id") Long id) {
        return artisteRepository.findById(id)
                .orElse(null);
    }
}

