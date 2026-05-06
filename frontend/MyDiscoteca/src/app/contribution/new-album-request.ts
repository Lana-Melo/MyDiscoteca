import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumInfo } from '../models/album';
import { AlbumService } from '../services/album.service';
import { ContributionService } from '../services/contribution.service';
type PhysicalSupportOption = 'CD' | 'Vinyl' | 'Cassette';

@Component({
  selector: 'app-new-album-version-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PorscheDesignSystemModule],
  templateUrl: './new-album-version-request.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAlbumVersionRequest {
  selectedAlbumId = '';
  eanCode = '';
  physicalSupport: PhysicalSupportOption | '' = '';
  designation = '';

  albums: AlbumInfo[] = [];
  isLoadingAlbums = true;
  isSubmitting = false;

  showError = false;
  errorMessages: string[] = [];

  successMessage = '';
  submittedRequestSummary: {
    albumTitle: string;
    eanCode: string;
    physicalSupport: PhysicalSupportOption;
    designation: string;
    status: string;
  } | null = null;

  private readonly albumService = inject(AlbumService);
  private readonly contributionService = inject(ContributionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.loadAlbums();
  }

  submitRequest(): void {
    const validationMessages = this.validateForm();

    if (validationMessages.length > 0) {
      this.showError = true;
      this.errorMessages = validationMessages;
      this.successMessage = '';
      this.submittedRequestSummary = null;
      this.changeDetectorRef.markForCheck();
      return;
    }

    const selectedAlbum = this.albums.find(
      (album) => (album._id ?? album.id) === this.selectedAlbumId
    );

    this.isSubmitting = true;
    this.showError = false;
    this.errorMessages = [];
    this.changeDetectorRef.markForCheck();

    this.contributionService.submitAlbumVersionRequest({
      albumId: this.selectedAlbumId,
      eanCode: this.eanCode.trim(),
      physicalSupport: this.physicalSupport as PhysicalSupportOption,
      designation: this.designation.trim() || undefined,
    }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Request submitted successfully. Status: em análise.';
        this.submittedRequestSummary = {
          albumTitle: selectedAlbum?.title ?? 'Unknown album',
          eanCode: response.eanCode,
          physicalSupport: response.physicalSupport,
          designation: response.designation ?? '',
          status: response.status,
        };
        this.resetForm();
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.showError = true;
        this.errorMessages = [
          err?.error?.message ?? 'An error occurred while submitting the request. Please try again.'
        ];
        this.successMessage = '';
        this.submittedRequestSummary = null;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (albums) => {
        this.albums = [...albums].sort((left, right) =>
          left.title.localeCompare(right.title)
        );
        this.isLoadingAlbums = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.albums = [];
        this.isLoadingAlbums = false;
        this.showError = true;
        this.errorMessages = ['Unable to load albums for selection.'];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private validateForm(): string[] {
    const messages: string[] = [];

    if (!this.selectedAlbumId) {
      messages.push('Please select the album for which you are proposing a new version.');
    }

    if (!/^\d{13}$/.test(this.eanCode.trim())) {
      messages.push('EAN-13 must contain exactly 13 digits.');
    }

    if (!this.physicalSupport) {
      messages.push('Please select the physical support.');
    }

    return messages;
  }

  private resetForm(): void {
    this.selectedAlbumId = '';
    this.eanCode = '';
    this.physicalSupport = '';
    this.designation = '';
  }
}