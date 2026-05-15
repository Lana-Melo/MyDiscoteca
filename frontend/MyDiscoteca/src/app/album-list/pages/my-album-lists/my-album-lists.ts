import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AlbumList, AlbumListItem } from '../../../models/album-list';
import { AlbumInfo } from '../../../models/album';
import { AlbumListService } from '../../../services/album-list.service';

@Component({
  selector: 'app-my-album-lists',
  standalone: true,
  imports: [FormsModule, RouterLink, PorscheDesignSystemModule],
  template: `
    <div class="grid-template">
      <div class="col-basic">
        <p-button-pure icon="arrow-left" [routerLink]="['/dashboard']">
          Back to dashboard
        </p-button-pure>
      </div>

      <div class="col-basic">
        <p-heading tag="h1">My Album Lists</p-heading>
      </div>

      @if (successMessage) {
        <div class="col-basic">
          <p-inline-notification
            headingTag="h2"
            state="success"
            heading="Success"
            [description]="successMessage"
            (dismiss)="successMessage = ''">
          </p-inline-notification>
        </div>
      }

      @if (errorMessage) {
        <div class="col-basic">
          <p-inline-notification
            headingTag="h2"
            state="error"
            heading="Something went wrong"
            [description]="errorMessage"
            (dismiss)="errorMessage = ''">
          </p-inline-notification>
        </div>
      }

      <div class="col-basic grid grid-cols-subgrid gap-y-4">
        <div class="col-span-one-half">
          <p-input-text
            [required]="true"
            [compact]="true"
            label="New list name"
            name="newListName"
            maxlength="100"
            [disabled]="isCreating"
            [(ngModel)]="newListName">
          </p-input-text>
          <p-text color="contrast-medium">Use at most 100 characters.</p-text>
        </div>

        <div class="col-span-one-half flex items-end">
          <p-button
            type="button"
            [loading]="isCreating"
            [disabled]="isCreating"
            (click)="createList()">
            Create list
          </p-button>
        </div>
      </div>

      <div class="col-basic flex justify-between items-center">
        <p-heading size="medium" tag="h2">Lists</p-heading>
        @if (albumLists.length > 0) {
          <div style="min-width: 220px;">
            <p-select
              label="Sort by"
              [value]="sortBy"
              (change)="onSortChange($event)">
              <p-select-option value="updatedAt_desc">Last modified (Newest)</p-select-option>
              <p-select-option value="updatedAt_asc">Last modified (Oldest)</p-select-option>
              <p-select-option value="name_asc">Name (A-Z)</p-select-option>
              <p-select-option value="name_desc">Name (Z-A)</p-select-option>
              <p-select-option value="albumCount_desc">Albums (Most)</p-select-option>
              <p-select-option value="albumCount_asc">Albums (Fewest)</p-select-option>
            </p-select>
          </div>
        }
      </div>

      @if (isLoading) {
        <div class="col-basic text-center">
          <p-spinner></p-spinner>
        </div>
      } @else if (albumLists.length === 0) {
        <div class="col-basic text-center">
          <p-text color="contrast-medium">
            You don't have any album lists yet.
          </p-text>
        </div>
      } @else {
        <div class="col-basic grid grid-cols-subgrid gap-y-4">
          @for (list of sortedLists; track list._id) {
            <div class="col-span-one-third">
              <div
                role="button"
                tabindex="0"
                class="cursor-pointer"
                (click)="openList(list)"
                (keydown.enter)="openList(list)">
                <p-button-tile label="Open list" [description]="list.name">
                  <img
                    [src]="getCoverImageUrl(list)"
                    [alt]="list.name"
                    (error)="handleImageError($event)"
                  />
                  <p-text slot="footer" theme="dark">
                    {{ list.albumCount }} {{ list.albumCount === 1 ? 'album' : 'albums' }} · Updated {{ formatDate(list.updatedAt) }}
                  </p-text>
                </p-button-tile>
              </div>

              <div class="flex justify-end mt-static-sm">
                <p-button-pure
                  icon="delete"
                  color="notification-error"
                  type="button"
                  [disabled]="isDeleting"
                  (click)="openDeleteModal(list)">
                  Remove
                </p-button-pure>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <p-modal [open]="detailsModalOpen" [aria]="{'aria-label': 'Album list details'}" (dismiss)="closeDetailsModal()">
      <p-heading slot="header" size="large" tag="h2">
        {{ selectedList?.name }}
      </p-heading>

      @if (selectedList && selectedList.albums.length > 0) {
        <div class="flex flex-col gap-static-sm">
          @for (item of selectedList.albums; track getAlbumId(item)) {
            <a [routerLink]="['/album/details', getAlbumId(item)]" (click)="closeDetailsModal()">
              <p-button-pure icon="arrow-head-right">
                {{ getAlbumTitle(item) }}
              </p-button-pure>
            </a>
          }
        </div>
      } @else {
        <p-text color="contrast-medium">
          This list does not have any albums yet.
        </p-text>
      }

      <p-button-group slot="footer">
        <p-button type="button" variant="secondary" (click)="closeDetailsModal()">close</p-button>
      </p-button-group>
    </p-modal>

    <p-modal [open]="deleteModalOpen" [aria]="{'aria-label': 'Remove album list'}" (dismiss)="closeDeleteModal()">
      <p-heading slot="header" size="large" tag="h2">
        Remove List
      </p-heading>

      <p-text>
        Are you sure you want to remove "{{ listToDelete?.name }}"?
      </p-text>

      <p-button-group slot="footer">
        <p-button type="button" [loading]="isDeleting" (click)="confirmDelete()">yes, remove</p-button>
        <p-button type="button" variant="secondary" (click)="closeDeleteModal()">no, cancel</p-button>
      </p-button-group>
    </p-modal>
  `,
  styles: ``,
})
export class MyAlbumLists implements OnInit {
  private readonly albumListService = inject(AlbumListService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  albumLists: AlbumList[] = [];
  newListName = '';
  sortBy = 'updatedAt_desc';
  isLoading = true;
  isCreating = false;
  isDeleting = false;
  successMessage = '';
  errorMessage = '';
  detailsModalOpen = false;
  deleteModalOpen = false;
  selectedList: AlbumList | null = null;
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

  createList(): void {
    const name = this.newListName.trim();
    this.successMessage = '';
    this.errorMessage = '';

    if (!name) {
      this.errorMessage = 'List name is required.';
      return;
    }

    if (name.length > 100) {
      this.errorMessage = 'List name must have at most 100 characters.';
      return;
    }

    this.isCreating = true;
    this.albumListService.createList(name).subscribe({
      next: (albumList) => {
        this.albumLists = [albumList, ...this.albumLists];
        this.newListName = '';
        this.isCreating = false;
        this.successMessage = 'Album list created successfully.';
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not create the album list.';
        this.isCreating = false;
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

  openList(albumList: AlbumList): void {
    this.selectedList = albumList;
    this.detailsModalOpen = true;
    this.changeDetectorRef.markForCheck();
  }

  closeDetailsModal(): void {
    this.detailsModalOpen = false;
    this.selectedList = null;
    this.changeDetectorRef.markForCheck();
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
    this.successMessage = '';
    this.errorMessage = '';

    this.albumListService.deleteList(listId).subscribe({
      next: () => {
        this.albumLists = this.albumLists.filter((list) => list._id !== listId);
        this.isDeleting = false;
        this.successMessage = 'Album list removed successfully.';
        this.closeDeleteModal();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not remove the album list.';
        this.isDeleting = false;
        this.closeDeleteModal();
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
