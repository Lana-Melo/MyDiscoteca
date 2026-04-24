import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  LoginPayload,
  LoginResponse,
  RegisterUserPayload,
  UpdateUserPayload,
  UserApiResponse,
  UserInfo
} from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = '/api/users';
  private readonly authUrl = '/api/auth';
  private readonly http = inject(HttpClient);

  registerUser(user: RegisterUserPayload): Observable<UserInfo> {
    return this.http.post<UserApiResponse>(this.url, user, this.buildHttpOptions())
      .pipe(map((response) => response.user));
  }

  login(credentials: LoginPayload): Observable<UserInfo> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, credentials, this.buildHttpOptions())
      .pipe(
        map((response) => {
          this.setSession(response.token, response.user.id);
          return response.user;
        })
      );
  }

  getMe(): Observable<UserInfo> {
    return this.http.get<UserApiResponse>(`${this.url}/me`, this.buildHttpOptions())
      .pipe(map((response) => response.user));
  }

  updateMe(user: UpdateUserPayload): Observable<UserInfo> {
    return this.http.put<UserApiResponse>(`${this.url}/me`, user, this.buildHttpOptions())
      .pipe(map((response) => response.user));
  }

  setCurrentUserIdForDevelopment(userId: string): void {
    localStorage.setItem('currentUserId', userId);
  }

  clearCurrentUserIdForDevelopment(): void {
    localStorage.removeItem('currentUserId');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem('authToken'));
  }

  private setSession(token: string, userId: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUserId', userId);
  }

  private buildHttpOptions() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const authToken = localStorage.getItem('authToken');
    const currentUserId = localStorage.getItem('currentUserId');

    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    if (currentUserId) {
      headers = headers.set('x-user-id', currentUserId);
    }

    return { headers };
  }
}
