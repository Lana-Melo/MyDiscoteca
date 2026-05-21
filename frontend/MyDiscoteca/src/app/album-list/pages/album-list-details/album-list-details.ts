import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumList, AlbumListItem } from '../../../models/album-list';
import { AlbumInfo } from '../../../models/album';
import { AlbumListService } from '../../../services/album-list.service';

@Component({
  selector: 'app-album-list-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, PorscheDesignSystemModule],
  templateUrl: './album-list-details.html'
})
export class AlbumListDetail implements OnInit {
  private readonly albumListService = inject(AlbumListService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);

  albumList: AlbumList | null = null;
  sortBy = 'addedAt_desc';
  isLoading = true;
  isRemoving = false;
  successMessage = '';
  errorMessage = '';
  albumToRemove: AlbumListItem | null = null;
  hasLoaded = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const listId = params.get('listId');

      if (!listId) {
        this.albumList = null;
        this.errorMessage = 'Album list not found.';
        this.isLoading = false;
        this.hasLoaded = true;
        this.changeDetectorRef.markForCheck();
        return;
      }

      this.loadList(listId);
    });
  }

  get sortedAlbums(): AlbumListItem[] {
    if (!this.albumList) return [];
    return [...this.albumList.albums].sort((a, b) => {
      switch (this.sortBy) {
        case 'addedAt_asc':
          return this.getTime(a.addedAt) - this.getTime(b.addedAt);
        case 'title_asc':
          return this.getAlbumTitle(a).localeCompare(this.getAlbumTitle(b));
        case 'title_desc':
          return this.getAlbumTitle(b).localeCompare(this.getAlbumTitle(a));
        case 'addedAt_desc':
        default:
          return this.getTime(b.addedAt) - this.getTime(a.addedAt);
      }
    });
  }

  loadList(listId: string): void {
    this.isLoading = true;
    this.hasLoaded = false;
    this.errorMessage = '';

    this.albumListService.getListById(listId).subscribe({
      next: (albumList) => {
        const safeAlbumList = albumList ?? ({} as AlbumList);
        this.albumList = {
          ...safeAlbumList,
          _id: safeAlbumList._id || listId,
          name: safeAlbumList.name || 'Album list',
          user: safeAlbumList.user || '',
          albums: Array.isArray(safeAlbumList.albums) ? safeAlbumList.albums : [],
          albumCount:
            typeof safeAlbumList.albumCount === 'number'
              ? safeAlbumList.albumCount
              : Array.isArray(safeAlbumList.albums)
                ? safeAlbumList.albums.length
                : 0,
        };
        this.isLoading = false;
        this.hasLoaded = true;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not load the album list.';
        this.isLoading = false;
        this.hasLoaded = true;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  onSortChange(event: Event): void {
    const selectedValue =
      (event as CustomEvent<{ value?: string }>).detail?.value ||
      (event.target as HTMLElement & { value?: string }).value;
    this.sortBy = selectedValue || this.sortBy;
    this.changeDetectorRef.markForCheck();
  }

  openRemoveModal(item: AlbumListItem): void {
    this.albumToRemove = item;
    this.successMessage = '';
    this.errorMessage = '';
    this.changeDetectorRef.markForCheck();
  }

  closeRemoveModal(): void {
    this.albumToRemove = null;
    this.changeDetectorRef.markForCheck();
  }

  confirmRemove(): void {
    if (!this.albumList || !this.albumToRemove || this.isRemoving) return;

    const item = this.albumToRemove;
    const albumId = this.getAlbumId(item);
    if (!albumId) return;

    this.isRemoving = true;
    this.albumListService.removeAlbum(this.albumList._id, albumId).subscribe({
      next: (updatedList) => {
        this.albumList = updatedList;
        this.isRemoving = false;
        this.successMessage = `"${this.getAlbumTitle(item)}" removed successfully.`;
        this.albumToRemove = null;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not remove the album from the list.';
        this.isRemoving = false;
        this.albumToRemove = null;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  getAlbum(item: AlbumListItem): AlbumInfo | null {
    return typeof item.album === 'string' ? null : item.album;
  }

  getAlbumId(item: AlbumListItem): string {
    return this.getAlbum(item)?._id || (typeof item.album === 'string' ? item.album : '') || item._id || '';
  }

  getAlbumTitle(item: AlbumListItem): string {
    return this.getAlbum(item)?.title || 'Unknown album';
  }

  getAlbumArtistName(item: AlbumListItem): string {
    return this.getAlbum(item)?.artist?.name || 'Unknown artist';
  }

  getAlbumImageUrl(item: AlbumListItem): string {
    return this.getAlbum(item)?.imageUrl || '/api/media/placeholders/album.svg';
  }

  trackAlbum(index: number, item: AlbumListItem): string {
    return item._id || this.getAlbumId(item) || `${index}`;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  }

  get hasAlbums(): boolean {
    return !!this.albumList && this.albumList.albums.length > 0;
  }

  private getTime(dateString: string | undefined): number {
    return dateString ? new Date(dateString).getTime() : 0;
  }
}
