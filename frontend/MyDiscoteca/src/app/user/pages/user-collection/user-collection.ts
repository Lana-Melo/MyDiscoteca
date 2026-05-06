import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumCollectionService } from '../../../services/album-collection.service';
import { AlbumCollection, Version } from '../../../models/album-collection';

@Component({
  selector: 'user-collection',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-button-pure icon="arrow-left" [routerLink]="['/user/profile']">
          Back to profile
        </p-button-pure>
      </div>

      <div class="col-wide">
        <p-heading>My Album Collection</p-heading>
      </div>

      @if (isLoading) {
        <div class="col-wide">
          <p-text>Loading collection...</p-text>
        </div>
      } @else if (errorMessage) {
        <div class="col-wide">
          <p-text color="notification-error">{{ errorMessage }}</p-text>
        </div>
      } @else if (collection && collection.versions.length > 0) {
        <div class="col-wide grid grid-cols-subgrid">
          @for (version of collection.versions; track version._id) {
            <div class="col-span-one-half">
              <div class="version-card">
                <img
                  class="album-image"
                  [src]="getAlbumImageUrl(version)"
                  [alt]="getAlbumTitle(version)"
                  (error)="handleImageError($event)"
                />
                <div class="version-info">
                  <p-heading size="small">{{ getAlbumTitle(version) }}</p-heading>
                  <p-text size="small">{{ getArtistName(version) }}</p-text>
                  <p-text size="x-small" color="contrast-medium">
                    {{ getSupportType(version) }} - {{ version.designation }}
                  </p-text>
                  <p-button-pure 
                    icon="delete" 
                    color="notification-error" 
                    (click)="removeVersion(version._id)"
                    [disabled]="isRemoving"
                  >
                    Remove
                  </p-button-pure>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="col-wide">
          <p-text>You don't have any albums in your collection yet.</p-text>
          <a [routerLink]="['/artists']">
            <p-button-pure icon="arrow-head-right">Browse artists to add albums</p-button-pure>
          </a>
        </div>
      }
    </div>
  `,
  styles: `
    .version-card {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--p-color-contrast-low);
      border-radius: 0.5rem;
      background: var(--p-color-background-surface);
    }

    .album-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 0.25rem;
    }

    .version-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  `,
})
export class UserCollection implements OnInit {
  private readonly collectionService = inject(AlbumCollectionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  collection: AlbumCollection | undefined;
  isLoading = true;
  isRemoving = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection(): void {
    this.isLoading = true;
    this.collectionService.getMyCollection().subscribe({
      next: (collection) => {
        this.collection = collection;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Could not load your album collection.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  removeVersion(versionId: string): void {
    if (confirm('Are you sure you want to remove this version from your collection?')) {
      this.isRemoving = true;
      this.collectionService.removeVersion(versionId).subscribe({
        next: () => {
          this.isRemoving = false;
          this.loadCollection();
        },
        error: () => {
          this.isRemoving = false;
          alert('Could not remove the version.');
        },
      });
    }
  }

  getAlbum(version: Version): any {
    const support = version.physicalSupport as any;
    return support?.album;
  }

  getAlbumTitle(version: Version): string {
    return this.getAlbum(version)?.title || 'Unknown Album';
  }

  getAlbumImageUrl(version: Version): string {
    return this.getAlbum(version)?.imageUrl || '/api/media/placeholders/album.svg';
  }

  getArtistName(version: Version): string {
    const album = this.getAlbum(version);
    const artist = album?.artist;
    return typeof artist === 'string' ? artist : (artist?.name || 'Unknown Artist');
  }

  getSupportType(version: Version): string {
    const support = version.physicalSupport as any;
    return support?.type || 'Unknown Support';
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.src = '/api/media/placeholders/album.svg';
    }
  }
}
