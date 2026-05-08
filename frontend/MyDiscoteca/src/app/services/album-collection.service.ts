import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AlbumCollection, AlbumCollectionApiResponse } from '../models/album-collection';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumCollectionService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly apiUrl = '/api/album-collection';

  getMyCollection(): Observable<AlbumCollection> {
    return this.http
      .get<AlbumCollectionApiResponse>(`${this.apiUrl}/me`, this.userService.buildHttpOptions())
      .pipe(map((response) => response.collection));
  }

  addVersion(versionId: string): Observable<AlbumCollection> {
    return this.http
      .post<AlbumCollectionApiResponse>(`${this.apiUrl}/me/versions`, { versionId }, this.userService.buildHttpOptions())
      .pipe(map((response) => response.collection));
  }

  removeVersion(versionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/versions/${versionId}`, this.userService.buildHttpOptions());
  }
}
