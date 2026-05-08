import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface AppNotification {
  _id: string;
  albumTitle: string;
  designation: string | null;
  status: 'Accepted' | 'Rejected';
  seen: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/notifications';

  getNotifications(): Observable<AppNotification[]> {
    return this.http
      .get<{ success: boolean; notifications: AppNotification[] }>(this.baseUrl)
      .pipe(map(r => r.notifications));
  }

  markAsSeen(): void {
    this.http.patch(`${this.baseUrl}/seen`, {}).subscribe();
  }

  getUnseenCount(): Observable<number> {
    return this.getNotifications().pipe(
      map(list => list.filter(n => !n.seen).length)
    );
  }
}