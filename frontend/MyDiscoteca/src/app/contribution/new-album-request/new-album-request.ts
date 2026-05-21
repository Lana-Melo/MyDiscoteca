import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumInfo } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { ContributionService } from '../../services/contribution.service';
type PhysicalSupportOption = 'CD' | 'Vinyl' | 'Cassette';

@Component({
  selector: 'app-new-album-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PorscheDesignSystemModule],
  templateUrl: './new-album-request.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAlbumVersionRequest {
  selectedAlbumId = '';
  eanCode = '';
  physicalSupport: PhysicalSupportOption | '' = '';
  designation = '';

  albumError = signal('');
  eanCodeError = signal('');
  physicalSupportError = signal('');

  onEanKeydown(event: KeyboardEvent): void {
    // Allow only numeric keys (0-9), backspace, delete, tab, escape, and arrow keys
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    const isNumericKey = /^[0-9]$/.test(event.key);
    const isAllowedKey = allowedKeys.includes(event.key);
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X for copy/paste/select
    if (isCtrlOrCmd && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    if (!isNumericKey && !isAllowedKey) {
      event.preventDefault();
    }
  }

  onEanInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.value = target.value.replace(/\D/g, '');
      this.eanCode = target.value;
    }
  }

  albums: AlbumInfo[] = [];
  isLoadingAlbums = true;
  isSubmitting = false;

  errorMessage = '';
  successModalOpen = false;

  private readonly albumService = inject(AlbumService);
  private readonly contributionService = inject(ContributionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.loadAlbums();
  }

  submitRequest(): void {
    if (!this.validateForm()) {
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.changeDetectorRef.markForCheck();

    this.contributionService.submitAlbumVersionRequest({
      albumId: this.selectedAlbumId,
      eanCode: this.eanCode.trim(),
      physicalSupport: this.physicalSupport as PhysicalSupportOption,
      designation: this.designation.trim() || undefined,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.resetForm();
        this.successModalOpen = true;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400 && err.error?.message?.includes('eanCode')) {
          this.errorMessage = 'This EAN-13 code is already registered for another album version.';
        } else {
          this.errorMessage = err?.error?.message ?? 'An error occurred while submitting the request.';
        }
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  closeSuccessModal(): void {
    this.successModalOpen = false;
    this.router.navigate(['/contributions/album-version/my-requests']);
  }

  private loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (albums) => {
        this.albums = [...albums].sort((left, right) =>
          left.title.localeCompare(right.title)
        );
        this.isLoadingAlbums = false;
        const preselected = this.route.snapshot.queryParamMap.get('albumId');
        if (preselected) {
          this.selectedAlbumId = preselected;
        }
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.albums = [];
        this.isLoadingAlbums = false;
        this.errorMessage = 'Unable to load albums for selection.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private validateForm(): boolean {
    this.albumError.set('');
    this.eanCodeError.set('');
    this.physicalSupportError.set('');

    let valid = true;

    if (!this.selectedAlbumId) {
      this.albumError.set('Please select the album for which you are proposing a new version.');
      valid = false;
    }

    if (!/^\d{13}$/.test(this.eanCode.trim())) {
      this.eanCodeError.set('EAN-13 must contain exactly 13 digits.');
      valid = false;
    }

    if (!this.physicalSupport) {
      this.physicalSupportError.set('Please select the physical support.');
      valid = false;
    }

    return valid;
  }

  private resetForm(): void {
    this.selectedAlbumId = '';
    this.eanCode = '';
    this.physicalSupport = '';
    this.designation = '';
  }
}