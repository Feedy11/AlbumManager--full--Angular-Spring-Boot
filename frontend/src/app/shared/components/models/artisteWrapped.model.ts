import { Artiste } from "./artiste.model";

export class ArtisteWrapped {
  _embedded!: { artistes: Artiste[] };
}
