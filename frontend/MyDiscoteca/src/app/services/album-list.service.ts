import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AlbumList,
  AlbumListApiResponse,
  AlbumListsApiResponse
} from '../models/album-list';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumListService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly apiUrl = '/api/album-lists';

  getMyLists(): Observable<AlbumList[]> {
    return this.http
      .get<AlbumListsApiResponse>(`${this.apiUrl}/me`, this.userService.buildHttpOptions())
      .pipe(map((response) => response.albumLists));
  }

  createList(name: string): Observable<AlbumList> {
    return this.http
      .post<AlbumListApiResponse>(this.apiUrl, { name }, this.userService.buildHttpOptions())
      .pipe(map((response) => response.albumList));
  }

  deleteList(listId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${listId}`, this.userService.buildHttpOptions());
  }

  addAlbum(listId: string, albumId: string): Observable<AlbumList> {
    return this.http
      .post<AlbumListApiResponse>(
        `${this.apiUrl}/${listId}/albums`,
        { albumId },
        this.userService.buildHttpOptions()
      )
      .pipe(map((response) => response.albumList));
  }
}
