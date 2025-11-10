import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Artiste } from '../../shared/components/models/artiste.model';
import { AlbumService } from './../../core/services/album.service';
import { UpdateArtisteComponent } from '../update-artiste/update-artiste.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-liste-artiste',
  standalone: true,
  imports: [CommonModule, UpdateArtisteComponent],
  templateUrl: './liste-artiste.component.html',
  styleUrl: './liste-artiste.component.css'
})
export class ListeArtisteComponent implements OnInit {
  artistes: Artiste[] = [];
  updateArtiste = new Artiste();
  ajout = true;

constructor(
  private albumService: AlbumService,public authService: AuthService) {}


  ngOnInit(): void {
    this.chargerArtistes();
  }

  chargerArtistes() {
    this.albumService.listArtistes().subscribe(arts => {
      this.artistes = arts._embedded.artistes;
      console.log('Artistes chargés:', this.artistes);
    });
  }

  updateArtisteMethod(art: Artiste) {
    this.updateArtiste = art;
    this.ajout = false;
    console.log('Édition de l\'artiste:', art);
  }

  artisteUpdated(art: Artiste) {
    console.log('Artiste mis à jour:', art);
    this.chargerArtistes();

    this.updateArtiste = new Artiste();
    this.ajout = true;
  }
  trackById(index: number, art: any) {
  return art.idArtiste;
}
}
