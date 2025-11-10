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

  albums: Album[] = [];
  Artistes: Artiste[] = [];

  constructor(private http: HttpClient) {}

  listAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiURL).pipe(
      map(albums => albums.map(album => this.formatAlbumDates(album)))
    );
  }
  listArtistes(): Observable<ArtisteWrapped> {
    return this.http.get<ArtisteWrapped>(this.artisteURL);
  }
  consulterArtiste(id: number): Artiste | undefined {
    return this.Artistes.find(artiste => artiste.idArtiste === id);
  }
  ajouterAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiURL, album, httpOptions);
  }
  supprimerAlbum(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }
  consulterAlbum(id: number): Observable<Album> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Album>(url).pipe(
      map(album => this.formatAlbumDates(album))
    );
  }
  updateAlbum(a: Album): Observable<Album> {
    const url = `${this.apiURL}/${a.idAlbum}`;
    return this.http.put<Album>(url, a, httpOptions);
  }

  //Méthode privée pour formater les dates
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

  rechercherParArtiste(idArtiste: number): Observable<Album[]> {
    const url = `${this.apiURL}/albumsartiste/${idArtiste}`;
    return this.http.get<Album[]>(url);

  }

  ajouterArtiste( art: Artiste):Observable<Artiste>{
return this.http.post<Artiste>(this.artisteURL,art, httpOptions);
}
updateArtiste(art: Artiste): Observable<Artiste> {
  const url = `${this.artisteURL}/${art.idArtiste}`;
  return this.http.put<Artiste>(url, art, httpOptions);
}


}
