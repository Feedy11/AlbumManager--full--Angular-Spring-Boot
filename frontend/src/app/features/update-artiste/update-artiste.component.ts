import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artiste } from '../../shared/components/models/artiste.model';
import { CommonModule, NgClass } from '@angular/common';
import { AlbumService } from '../../core/services/album.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-update-artiste',
  standalone: true,
  imports: [FormsModule,NgClass,CommonModule],
  templateUrl: './update-artiste.component.html',
  styleUrl: './update-artiste.component.css'
})
export class UpdateArtisteComponent {
  @Input() artiste = new Artiste();
  @Input() ajout = true;
  @Output() artisteUpdated = new EventEmitter<Artiste>();

  constructor(
    private  albumService: AlbumService,
    private toastr: ToastrService,private authservice: AuthService
  ) {}

  saveArtiste() {
    if (this.ajout) {
      // Mode Ajout
      this.albumService.ajouterArtiste(this.artiste).subscribe({
        next: (art) => {
          console.log('Artiste ajouté:', art);
          this.toastr.success('Artiste ajouté avec succès! 🎵', 'Succès');
          this.artisteUpdated.emit(art);
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout:', err);
          this.toastr.error('Erreur lors de l\'ajout de l\'artiste', 'Erreur');
        }
      });
    } else {
      // Mode Modification
      this.albumService.updateArtiste(this.artiste).subscribe({
        next: (art) => {
          console.log('Artiste modifié:', art);
          this.toastr.success('Artiste modifié avec succès! ✨', 'Succès');
          this.artisteUpdated.emit(art);
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de la modification:', err);
          this.toastr.error('Erreur lors de la modification', 'Erreur');
        }
      });
    }
  }

  cancelEdit() {
    this.resetForm();
    this.toastr.info('Modification annulée', 'Info');
  }

  resetForm() {
    this.artiste = new Artiste();
    this.ajout = true;
  }
}
