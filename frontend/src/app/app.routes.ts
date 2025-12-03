import { Routes } from '@angular/router';
import { AlbumsComponent } from './features/projects/albums/albums.component';
import { AddAlbumComponent } from './features/projects/add-album/add-album.component';
import { UpdateAlbumComponent } from './features/projects/update-album/update-album.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ListeArtisteComponent } from './features/liste-artiste/liste-artiste.component';
import { ForbiddenComponent } from './features/forbidden/forbidden.component';
import { produitGuard } from './core/guards/album.guard';
import { VerifEmailComponent } from './features/auth/verif-email/verif-email.component';

export const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },

  { path: 'albums', component: AlbumsComponent },

  {path: 'add-album',component: AddAlbumComponent,canActivate: [produitGuard]},

  {path: 'updateAlbum/:id',component: UpdateAlbumComponent,canActivate: [produitGuard]},

  { path: 'listeArtistes', component: ListeArtisteComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent},

  { path: 'app-forbidden', component: ForbiddenComponent },

  { path: '**', redirectTo: 'albums' },
];
