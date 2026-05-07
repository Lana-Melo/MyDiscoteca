import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ContributionService, AlbumVersionRequestResponse } from '../../services/contribution.service';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PorscheDesignSystemModule],
  templateUrl: './my-requests.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MyRequests implements OnInit {
  requests: AlbumVersionRequestResponse[] = [];
  filteredRequests: AlbumVersionRequestResponse[] = [];

  selectedStatus = '';
  isLoading = true;
  showError = false;

  private readonly contributionService = inject(ContributionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadRequests();
  }

  onStatusFilterChange(): void {
    this.applyFilter();
  }

  getStatusTextColor(status: string): string {
    switch (status) {
      case 'aceite':   return 'green';
      case 'recusado': return 'red';
      default:         return 'orange';
    }
  }

  private loadRequests(): void {
    this.isLoading = true;
    this.showError = false;

    this.contributionService.getMyRequests().subscribe({
      next: (response) => {
        // O backend devolve { contributions: [...] } ou diretamente um array.
        const data = Array.isArray(response)
          ? response
          : (response as any).contributions ?? [];

        this.requests = data;
        this.applyFilter();
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.showError = true;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private applyFilter(): void {
    this.filteredRequests = this.selectedStatus
      ? this.requests.filter(r => r.status === this.selectedStatus)
      : [...this.requests];
  }
}