import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlbumInfo, AlbumsApiResponse, AlbumApiResponse } from '../models/album';

@Injectable({
  providedIn: 'root',
})

export class AlbumService {
  url = '/api/albums';

  http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllAlbums(): Observable<AlbumInfo[]> {
    return this.http.get<AlbumsApiResponse>(`${this.url}/`)
      .pipe(map(response => response.albums));
  }

  getAlbumById(id: string): Observable<AlbumInfo> {
    return this.http.get<AlbumApiResponse>(`${this.url}/${id}`)
      .pipe(map(response => response.album));
  }

  searchAlbums(query: string): Observable<AlbumInfo[]> {
    return this.http.get<AlbumsApiResponse>(`${this.url}/search`, {
      params: { q: query }
    }).pipe(map(response => response.albums));
  }
}
