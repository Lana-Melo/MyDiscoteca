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
      <div class="col-basic flex justify-between items-center">
        <p-heading tag="h1">My Albums</p-heading>
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

      @if (successMessage) {
        <div class="col-basic">
          <p-inline-notification state="success" [description]="successMessage" (dismiss)="successMessage = ''"></p-inline-notification>
        </div>
      }
      @if (errorMessage) {
        <div class="col-basic">
          <p-inline-notification state="error" [description]="errorMessage" (dismiss)="errorMessage = ''"></p-inline-notification>
        </div>
      }

      @if (isLoading) {
        <div class="col-basic">
          <p-text>Loading collection...</p-text>
        </div>
      } @else if (errorMessage) {
        <div class="col-basic">
          <p-text color="notification-error">{{ errorMessage }}</p-text>
        </div>
      } @else if (collection && collection.versions.length > 0) {
        <div class="col-basic flex flex-col gap-4">
          @for (item of sortedVersions; track item.version._id) {
            <div style="display: grid; grid-template-columns: 72px 1fr auto; gap: 1rem; align-items: center; padding: 1rem; border: 1px solid #e3e4e5; border-radius: 12px;">
              <a [routerLink]="['/album/details', getAlbumId(item)]" [queryParams]="{ from: 'collection' }">
                <img
                  [src]="getAlbumImageUrl(item)"
                  [alt]="getAlbumTitle(item)"
                  style="width: 72px; height: 72px; object-fit: cover; border-radius: 8px; background: #f5f5f5;"
                  (error)="handleImageError($event)"
                />
              </a>

              <div style="min-width: 0;">
                <a [routerLink]="['/album/details', getAlbumId(item)]" [queryParams]="{ from: 'collection' }" class="album-link">
                  <p-heading size="small" tag="h2">{{ getAlbumTitle(item) }}</p-heading>
                </a>
                <p-text color="contrast-medium">{{ getArtistName(item) }}</p-text>
                <p-text color="contrast-medium" size="x-small">{{ getSupportType(item) }} - {{ item.version.designation }}</p-text>
                <p-text color="contrast-medium" size="x-small">EAN: {{ item.version.eanCode }}</p-text>
                <p-text color="contrast-medium" size="x-small">Added on: {{ formatDate(item.addedAt) }}</p-text>
              </div>

              <p-button-pure
                icon="delete"
                color="notification-error"
                type="button"
                [disabled]="isRemoving"
                (click)="removeVersion(item.version._id)">
                Remove
              </p-button-pure>
            </div>
          }
        </div>
      } @else {
        <div class="col-basic">
          <p-text>You don't have any albums in your collection yet.</p-text>
          <a [routerLink]="['/search']">
            <p-button-pure icon="arrow-head-right">Browse artists to add albums</p-button-pure>
          </a>
        </div>
      }
    </div>

    <p-modal [open]="deleteModalOpen" [aria]="{'aria-label': 'Remove version'}" (dismiss)="closeDeleteModal()">
      <p-heading slot="header" size="large" tag="h2">
        Remove Version
      </p-heading>

      <p-text>
        Are you sure you want to remove this version from your collection?
      </p-text>

      <p-button-group slot="footer">
        <p-button type="button" (click)="confirmDelete()">yes, remove</p-button>
        <p-button type="button" variant="secondary" (click)="closeDeleteModal()">no, cancel</p-button>
      </p-button-group>
    </p-modal>
  `,
  styles: `
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
  successMessage = '';
  sortBy = 'addedAt_desc';
  deleteModalOpen = false;
  versionToDelete: string | null = null;

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

  openDeleteModal(versionId: string): void {
    this.versionToDelete = versionId;
    this.deleteModalOpen = true;
    this.changeDetectorRef.markForCheck();
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.versionToDelete = null;
    this.changeDetectorRef.markForCheck();
  }

  confirmDelete(): void {
    if (!this.versionToDelete) return;

    const versionId = this.versionToDelete;
    this.closeDeleteModal();
    
    this.isRemoving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.collectionService.removeVersion(versionId).subscribe({
      next: () => {
        this.isRemoving = false;
        this.successMessage = 'Version removed from your collection successfully!';
        this.loadCollection();
      },
      error: (err) => {
        this.isRemoving = false;
        this.errorMessage = err.error?.message || 'Could not remove the version.';
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  removeVersion(versionId: string): void {
    this.openDeleteModal(versionId);
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

