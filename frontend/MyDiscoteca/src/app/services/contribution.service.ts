import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlbumVersionRequestPayload {
  albumId: string;
  eanCode: string;
  physicalSupport: 'CD' | 'Vinyl' | 'Cassette';
  designation?: string;
}

export interface AlbumVersionRequestResponse {
  _id: string;
  albumId: string;
  albumTitle?: string;
  eanCode: string;
  physicalSupport: 'CD' | 'Vinyl' | 'Cassette';
  designation?: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  private readonly baseUrl = '/api/contributions';

  constructor(private http: HttpClient) {}

  submitAlbumVersionRequest(payload: AlbumVersionRequestPayload): Observable<AlbumVersionRequestResponse> {
    return this.http.post<AlbumVersionRequestResponse>(
      `${this.baseUrl}/album-version`,
      payload
    );
  }

  getMyRequests(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/album-version/my-requests`
    );
  }
}