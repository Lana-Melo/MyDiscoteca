import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistApiResponse, ArtistInfo, ArtistsApiResponse } from './artist';

@Injectable({
  providedIn: 'root',
})

export class ArtistService {
  url = '/api/artists';

  // Injecta o HttpClient no ArtistService
  http = inject(HttpClient);

  // Cabeçalhos a incluir nos pedidos http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obter a lista de todos os artistas.
  getAllArtists(): Observable<ArtistInfo[]> {
    return this.http.get<ArtistsApiResponse>(`${this.url}/`)
      .pipe(map(response => response.artists));
  }

  // Obter um artista pelo seu id.
  getArtistById(id: string): Observable<ArtistInfo> {
    return this.http.get<ArtistApiResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.artist));
  }

  // Pesquisar artistas por nome (autocomplete).
  searchArtists(query: string): Observable<ArtistInfo[]> {
    return this.http.get<ArtistsApiResponse>(`${this.url}/search`, {
      params: { q: query }
    }).pipe(map(response => response.artists));
  }
}
