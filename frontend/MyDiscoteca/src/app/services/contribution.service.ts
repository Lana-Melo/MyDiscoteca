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
  eanCode: string;
  physicalSupport: 'CD' | 'Vinyl' | 'Cassette';
  designation?: string;
  status: 'em análise' | 'aceite' | 'recusado';
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

  getMyRequests(): Observable<AlbumVersionRequestResponse[]> {
    return this.http.get<AlbumVersionRequestResponse[]>(
      `${this.baseUrl}/album-version/my-requests`
    );
  }
}