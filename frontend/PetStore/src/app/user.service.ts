import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  RegisterUserPayload,
  UserApiResponse,
  UserInfo,
  UsersApiResponse
} from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = '/api/users';
  private readonly http = inject(HttpClient);

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UsersApiResponse>(this.url)
      .pipe(map((response) => response.users));
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserApiResponse>(`${this.url}/${id}`)
      .pipe(map((response) => response.user));
  }

  registerUser(user: RegisterUserPayload): Observable<UserInfo> {
    return this.http.post<UserApiResponse>(this.url, user, this.httpOptions)
      .pipe(map((response) => response.user));
  }

  updateUser(id: string, user: any): Observable<UserInfo> {
    return this.http.put<UserApiResponse>(`${this.url}/${id}`, user, this.httpOptions)
      .pipe(map((response) => response.user));
  }

  deleteUser(id: string): Observable<UserInfo> {
    return this.http.delete<UserApiResponse>(`${this.url}/${id}`, this.httpOptions)
      .pipe(map((response) => response.user));
  }
}
