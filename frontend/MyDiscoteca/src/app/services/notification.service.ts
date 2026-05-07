import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'notificationsSeenAt';

  getNotifications(): Observable<any[]> {
    return this.http.get<any>('/api/contributions/album-version/my-requests').pipe(
      map(response => {
        const all = Array.isArray(response) ? response : response.contributions ?? [];
        const seenAt = localStorage.getItem(this.storageKey);
        return all.filter((r: any) =>
          r.status === 'aceite' || r.status === 'recusado'
        );
      })
    );
  }

  markAsSeen(): void {
    localStorage.setItem(this.storageKey, new Date().toISOString());
  }
}