import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumCollectionService } from '../../../services/album-collection.service';
import { AlbumCollection, AlbumCollectionItem, Version } from '../../../models/album-collection';

@Component({
  selector: 'user-collection',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <a [routerLink]="['/user/profile']">
          <p-button-pure icon="arrow-left">Back to profile</p-button-pure>
        </a>
      </div>

      <div class="col-wide flex justify-between items-center">
        <p-heading>My Album Collection</p-heading>
        @if (collection && collection.versions.length > 0) {
          <div style="min-width: 200px;">
            <p-select
              label="Sort by"
              [value]="sortBy"
              (change)="onSortChange($event)">
              <p-select-option value="addedAt_desc">Date Added (Newest)</p-select-option>
              <p-select-option value="addedAt_asc">Date Added (Oldest)</p-select-option>
              <p-select-option value="title_asc">Title (A-Z)</p-select-option>
              <p-select-option value="artist_asc">Artist (A-Z)</p-select-option>
              <p-select-option value="ean_asc">EAN-13 (0-9)</p-select-option>
              <p-select-option value="type_asc">Format</p-select-option>
            </p-select>
          </div>
        }
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
          @for (item of sortedVersions; track item.version._id) {
            <div class="col-span-one-half">
              <div class="version-card">
                <a [routerLink]="['/album/details', getAlbumId(item)]" [queryParams]="{ from: 'collection' }">
                  <img
                    class="album-image"
                    [src]="getAlbumImageUrl(item)"
                    [alt]="getAlbumTitle(item)"
                    (error)="handleImageError($event)"
                  />
                </a>
                <div class="version-info">
                  <a [routerLink]="['/album/details', getAlbumId(item)]" [queryParams]="{ from: 'collection' }" class="album-link">
                    <p-heading size="small">{{ getAlbumTitle(item) }}</p-heading>
                  </a>
                  <p-text size="small">{{ getArtistName(item) }}</p-text>
                  <p-text size="x-small" color="contrast-medium">
                    {{ getSupportType(item) }} - {{ item.version.designation }}
                  </p-text>
                  <p-text size="x-small" color="contrast-medium">
                    EAN: {{ item.version.eanCode }}
                  </p-text>
                  <p-text size="x-small" color="contrast-medium">
                    Added on: {{ formatDate(item.addedAt) }}
                  </p-text>
                  <p-button-pure 
                    icon="delete" 
                    color="notification-error" 
                    (click)="removeVersion(item.version._id)"
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
          <a [routerLink]="['/search']">
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

    .album-link {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .album-link:hover {
      text-decoration: underline;
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
  sortBy = 'addedAt_desc';

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

  get sortedVersions(): AlbumCollectionItem[] {
    if (!this.collection) return [];
    
    return [...this.collection.versions].sort((a, b) => {
      switch (this.sortBy) {
        case 'addedAt_desc':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'addedAt_asc':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'title_asc':
          return this.getAlbumTitle(a).localeCompare(this.getAlbumTitle(b));
        case 'artist_asc':
          return this.getArtistName(a).localeCompare(this.getArtistName(b));
        case 'ean_asc':
          return a.version.eanCode.localeCompare(b.version.eanCode);
        case 'type_asc':
          return this.getSupportType(a).localeCompare(this.getSupportType(b));
        default:
          return 0;
      }
    });
  }

  onSortChange(event: any): void {
    this.sortBy = event.detail.value || event.target.value;
    this.changeDetectorRef.markForCheck();
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

  getAlbum(item: AlbumCollectionItem): any {
    const support = item.version.physicalSupport as any;
    return support?.album;
  }

  getAlbumId(item: AlbumCollectionItem): string {
    return this.getAlbum(item)?._id || '';
  }

  getAlbumTitle(item: AlbumCollectionItem): string {
    return this.getAlbum(item)?.title || 'Unknown Album';
  }

  getAlbumImageUrl(item: AlbumCollectionItem): string {
    return this.getAlbum(item)?.imageUrl || '/api/media/placeholders/album.svg';
  }

  getArtistName(item: AlbumCollectionItem): string {
    const album = this.getAlbum(item);
    const artist = album?.artist;
    return typeof artist === 'string' ? artist : (artist?.name || 'Unknown Artist');
  }

  getSupportType(item: AlbumCollectionItem): string {
    const support = item.version.physicalSupport as any;
    return support?.type || 'Unknown Support';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.src = '/api/media/placeholders/album.svg';
    }
  }
}

