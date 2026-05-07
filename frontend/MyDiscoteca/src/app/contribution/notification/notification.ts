import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-my-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink, PorscheDesignSystemModule],
  templateUrl: './notification.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotifications implements OnInit {
  notifications: any[] = [];
  isLoading = true;

  private readonly notificationService = inject(NotificationService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.notificationService.markAsSeen();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
}