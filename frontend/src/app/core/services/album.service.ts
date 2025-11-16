import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './../../shared/components/models/album.model';
import { Artiste } from './../../shared/components/models/artiste.model';
import { environment } from '../../../environments/environment';
import { ArtisteWrapped } from '../../shared/components/models/artisteWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiURL = environment.apiURL;
  private artisteURL: string = 'http://localhost:8081/Albums/artiste';

  constructor(private http: HttpClient) {}

  listAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiURL}/all`).pipe(
      map(albums => albums.map(album => this.formatAlbumDates(album)))
    );
  }

  listArtistes(): Observable<ArtisteWrapped> {
    return this.http.get<ArtisteWrapped>(this.artisteURL);
  }

  ajouterAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiURL}/addalbum`, album, httpOptions);
  }

  supprimerAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/delalbum/${id}`, httpOptions);
  }

  consulterAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiURL}/getbyid/${id}`).pipe(
      map(album => this.formatAlbumDates(album))
    );
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiURL}/updatealbum`, album, httpOptions);
  }

  rechercherParArtiste(idArtiste: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiURL}/albumsart/${idArtiste}`);
  }

  rechercherParNom(nom: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiURL}/albumsbynom/${nom}`);
  }

  ajouterArtiste(art: Artiste): Observable<Artiste> {
    return this.http.post<Artiste>(this.artisteURL, art, httpOptions);
  }

  updateArtiste(art: Artiste): Observable<Artiste> {
    return this.http.put<Artiste>(`${this.artisteURL}/${art.idArtiste}`, art, httpOptions);
  }

  private formatAlbumDates(album: Album): Album {
    if (album.dateSortie) {
      const date = new Date(album.dateSortie);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      album.dateSortie = `${year}-${month}-${day}`;
    }
    return album;
  }
}
