import { Artiste } from './artiste.model';

export class Album {
  idAlbum!: number;
  nomAlbum!: string;
  genre!: string;
  dateSortie!: any;
  nbChansons!: number;
  artiste!: Artiste;
}
