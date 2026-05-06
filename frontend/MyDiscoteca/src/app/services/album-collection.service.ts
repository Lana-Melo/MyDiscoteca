import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AlbumCollection, AlbumCollectionApiResponse } from '../models/album-collection';

@Injectable({
  providedIn: 'root',
})
export class AlbumCollectionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/album-collection';

  getMyCollection(): Observable<AlbumCollection> {
    return this.http
      .get<AlbumCollectionApiResponse>(`${this.apiUrl}/me`)
      .pipe(map((response) => response.collection));
  }

  addVersion(versionId: string): Observable<AlbumCollection> {
    return this.http
      .post<AlbumCollectionApiResponse>(`${this.apiUrl}/me/versions`, { versionId })
      .pipe(map((response) => response.collection));
  }

  removeVersion(versionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/versions/${versionId}`);
  }
}
