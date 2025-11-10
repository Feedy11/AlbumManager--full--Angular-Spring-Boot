import { AlbumService } from './../../../core/services/album.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../../../shared/components/models/album.model';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  newAlbum = new Album();
  searchTerm: string = '';
  allAlbums: Album[] = [];


constructor(
  private albumService: AlbumService,
  private toastr: ToastrService,
  public authService: AuthService
) {}

ngOnInit(): void {
  this.albumService.listAlbums().subscribe(albs => {
    this.allAlbums = albs;
    this.albums = albs;
  });
}
onSearch(): void {
  const term = this.searchTerm.toLowerCase().trim();
  if (!term) {
    this.albums = [...this.allAlbums];
    return;
  }
  this.albums = this.allAlbums.filter(album =>
    album.nomAlbum?.toLowerCase().includes(term) ||
    album.artiste?.nomArtiste?.toLowerCase().includes(term)
  );
}


supprimerAlbum(a: Album): void {
  const confirmation = window.confirm(
    `Voulez-vous vraiment supprimer l'album "${a.nomAlbum}" ?`
  );

  if (confirmation) {
    this.albumService.supprimerAlbum(a.idAlbum).subscribe({
      next: () => {
        this.toastr.success('Album supprimé avec succès 🎵', 'Succès');
        this.albums = this.albums.filter(album => album.idAlbum !== a.idAlbum);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l’album :', err);
        this.toastr.error('Une erreur est survenue lors de la suppression', 'Erreur');
      }
    });
  } else {
    this.toastr.info('Suppression annulée', 'Info');
  }
}


}
