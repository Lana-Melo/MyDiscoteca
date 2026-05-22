import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumList, AlbumListItem } from '../../../models/album-list';
import { AlbumInfo } from '../../../models/album';
import { AlbumListService } from '../../../services/album-list.service';

@Component({
  selector: 'app-my-album-lists',
  standalone: true,
  imports: [FormsModule, PorscheDesignSystemModule],
  templateUrl: './my-album-lists.html'
})
export class MyAlbumLists implements OnInit {
  private readonly albumListService = inject(AlbumListService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  albumLists: AlbumList[] = [];
  newListName = '';
  sortBy = 'updatedAt_desc';
  isLoading = true;
  isCreating = false;
  isDeleting = false;
  errorMessage = '';
  createModalOpen = false;
  createError = '';
  createNameError = '';
  successModalOpen = false;
  successModalMessage = '';
  deleteModalOpen = false;
  listToDelete: AlbumList | null = null;

  ngOnInit(): void {
    this.loadLists();
  }

  get sortedLists(): AlbumList[] {
    return [...this.albumLists].sort((left, right) => {
      switch (this.sortBy) {
        case 'updatedAt_asc':
          return this.getDateTime(left.updatedAt) - this.getDateTime(right.updatedAt);
        case 'name_asc':
          return left.name.localeCompare(right.name);
        case 'name_desc':
          return right.name.localeCompare(left.name);
        case 'albumCount_desc':
          return right.albumCount - left.albumCount;
        case 'albumCount_asc':
          return left.albumCount - right.albumCount;
        case 'updatedAt_desc':
        default:
          return this.getDateTime(right.updatedAt) - this.getDateTime(left.updatedAt);
      }
    });
  }

  loadLists(): void {
    this.isLoading = true;
    this.albumListService.getMyLists().subscribe({
      next: (albumLists) => {
        this.albumLists = albumLists;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not load your album lists.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  openCreateModal(): void {
    this.newListName = '';
    this.createError = '';
    this.createNameError = '';
    this.createModalOpen = true;
    this.changeDetectorRef.markForCheck();
  }

  closeCreateModal(): void {
    this.createModalOpen = false;
    this.newListName = '';
    this.createError = '';
    this.createNameError = '';
    this.changeDetectorRef.markForCheck();
  }

  createList(): void {
    const name = this.newListName.trim();
    this.createNameError = '';
    this.createError = '';

    if (!name) {
      this.createNameError = 'List name is required.';
      return;
    }

    if (name.length > 100) {
      this.createNameError = 'List name must have at most 100 characters.';
      return;
    }

    this.isCreating = true;
    this.albumListService.createList(name).subscribe({
      next: (albumList) => {
        this.albumLists = [albumList, ...this.albumLists];
        this.isCreating = false;
        this.createModalOpen = false;
        this.newListName = '';
        this.successModalMessage = 'Album list created successfully.';
        this.successModalOpen = true;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.createError = err.error?.message || 'Could not create the album list.';
        this.isCreating = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  closeSuccessModal(): void {
    this.successModalOpen = false;
    this.successModalMessage = '';
    this.changeDetectorRef.markForCheck();
  }

  onSortChange(event: Event): void {
    const selectedValue =
      (event as CustomEvent<{ value?: string }>).detail?.value ||
      (event.target as HTMLElement & { value?: string }).value;

    this.sortBy = selectedValue || this.sortBy;
    this.changeDetectorRef.markForCheck();
  }

  openList(albumList: AlbumList): void {
    this.router.navigate(['/album-lists', albumList._id]);
  }

  openDeleteModal(albumList: AlbumList): void {
    this.listToDelete = albumList;
    this.deleteModalOpen = true;
    this.changeDetectorRef.markForCheck();
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.listToDelete = null;
    this.changeDetectorRef.markForCheck();
  }

  confirmDelete(): void {
    if (!this.listToDelete) return;

    const listId = this.listToDelete._id;
    this.isDeleting = true;
    this.errorMessage = '';

    this.albumListService.deleteList(listId).subscribe({
      next: () => {
        this.albumLists = this.albumLists.filter((list) => list._id !== listId);
        this.isDeleting = false;
        this.closeDeleteModal();
        this.successModalMessage = 'Album list removed successfully.';
        this.successModalOpen = true;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not remove the album list.';
        this.isDeleting = false;
        this.closeDeleteModal();
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  getCoverImageUrl(albumList: AlbumList): string {
    return albumList.coverImageUrl || '/api/media/placeholders/album.svg';
  }

  getAlbum(item: AlbumListItem): AlbumInfo | null {
    return typeof item.album === 'string' ? null : item.album;
  }

  getAlbumId(item: AlbumListItem): string {
    return this.getAlbum(item)?._id || '';
  }

  getAlbumTitle(item: AlbumListItem): string {
    return this.getAlbum(item)?.title || 'Unknown album';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    img.src = '/api/media/placeholders/album.svg';
  }

  private getDateTime(dateString: string | undefined): number {
    return dateString ? new Date(dateString).getTime() : 0;
  }
}
