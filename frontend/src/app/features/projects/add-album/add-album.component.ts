import { Artiste } from './../../../shared/components/models/artiste.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../../../shared/components/models/album.model';
import { AlbumService } from './../../../core/services/album.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  Artistes!: Artiste[];
  newIdArtiste!: number;
  newArtiste!: Artiste;
  newAlbum: Album = new Album();

  constructor(
    private albumService: AlbumService,
    private toastr: ToastrService,
    public router: Router
  ) {}

    ngOnInit(): void {
      this.albumService.listArtistes().subscribe({
        next: (arts) => {
          this.Artistes = arts._embedded.artistes;
          console.log('Artistes chargés:', arts);
        },
        error: (err) => {
          console.error('Erreur chargement artistes:', err);
          this.toastr.error('Erreur lors du chargement des artistes !');
        }
      });
    }

  addAlbum(): void {
    if (!this.newAlbum.nomAlbum || !this.newAlbum.genre || !this.newAlbum.dateSortie || !this.newAlbum.nbChansons || !this.newIdArtiste) {
      this.toastr.error('Veuillez remplir tous l es champs obligatoires !', 'Erreur');
      return;
    }

    const selectedArtiste = this.Artistes.find(a => a.idArtiste === this.newIdArtiste);
    if (!selectedArtiste) {
      this.toastr.error('Artiste invalide !', 'Erreur');
      return;
    }

    this.newAlbum.artiste = selectedArtiste;

    this.albumService.ajouterAlbum(this.newAlbum).subscribe({
      next: () => {
        this.toastr.success('Album ajouté avec succès 🎵', 'Succès');
        this.newAlbum = new Album();
        this.newIdArtiste = 0;
        setTimeout(() => this.router.navigate(['/albums']), 500);
      },
      error: (err) => {
        console.error("Erreur ajout album:", err);
        this.toastr.error("Impossible d'ajouter l'album !", "Erreur");
      }
    });
  }
}
