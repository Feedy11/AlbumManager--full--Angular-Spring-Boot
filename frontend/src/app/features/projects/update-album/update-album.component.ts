import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlbumService } from './../../../core/services/album.service';
import { Album } from '../../../shared/components/models/album.model';
import { Artiste } from '../../../shared/components/models/artiste.model';

@Component({
  selector: 'app-update-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.css']
})
export class UpdateAlbumComponent implements OnInit {
  currentAlbum = new Album();
  Artistes: Artiste[] = [];
  UpdatedArtisteId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private toastr: ToastrService,
    private router: Router
  ) {}

ngOnInit(): void {
  const rawId = this.activatedRoute.snapshot.params['id'];
  const albumId = Number(rawId);

  if (isNaN(albumId) || albumId <= 0) {
    this.toastr.error('ID invalide !', 'Erreur');
    this.router.navigate(['/albums']);
    return;
  }
  this.albumService.listArtistes().subscribe({
    next: (arts) => this.Artistes = arts._embedded.artistes || arts,
    error: () => this.toastr.error('Erreur lors du chargement des artistes !', 'Erreur')
  });
  this.albumService.consulterAlbum(albumId).subscribe({
    next: (album) => {
      this.currentAlbum = album;
      this.UpdatedArtisteId = album.artiste?.idArtiste || 0;
    },
    error: () => {
      this.toastr.error('Album introuvable !', 'Erreur');
      this.router.navigate(['/albums']);
    }
  });
}

updateAlbum(): void {
  if (!this.currentAlbum.nomAlbum || !this.currentAlbum.genre || !this.currentAlbum.dateSortie || !this.currentAlbum.nbChansons) {
    this.toastr.error('Tous les champs sont obligatoires !', 'Erreur');
    return;
  }

  const updatedArtiste = this.Artistes.find(a => a.idArtiste === this.UpdatedArtisteId);
  if (updatedArtiste) {
    this.currentAlbum.artiste = updatedArtiste;
  } else {
    this.toastr.error('Artiste introuvable !', 'Erreur');
    return;
  }

  this.albumService.updateAlbum(this.currentAlbum).subscribe({
    next: () => {
      this.toastr.success('Album mis à jour avec succès 🎵', 'Succès');
      setTimeout(() => this.router.navigate(['/albums']), 1000);
    },
    error: (err) => {
      console.error('Erreur mise à jour:', err);
      this.toastr.error("Erreur lors de la mise à jour de l'album !", "Erreur");
    }
  });
}

  cancelUpdate(): void {
    this.toastr.info('Mise à jour annulée', 'Info');
    this.router.navigate(['/albums']);
  }
}
