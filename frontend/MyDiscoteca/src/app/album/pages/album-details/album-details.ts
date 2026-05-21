import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumInfo } from '../../../models/album';
import { AlbumService } from '../../../services/album.service';
import { AlbumCollectionService } from '../../../services/album-collection.service';
import { AlbumListService } from '../../../services/album-list.service';
import { UserService } from '../../../services/user.service';
import { AlbumCollection } from '../../../models/album-collection';
import { AlbumList } from '../../../models/album-list';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  selector: 'album-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink, Breadcrumb],
  templateUrl: './album-details.html',
  styles: `
    .album-image {
      width: 100%;
      max-width: 24rem;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 1rem;
      display: block;
    }

  `,
})
export class AlbumDetails implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly albumService = inject(AlbumService);
  private readonly albumCollectionService = inject(AlbumCollectionService);
  private readonly albumListService = inject(AlbumListService);
  public readonly userService = inject(UserService);

  album: AlbumInfo | undefined;
  detailsOpen = false;
  openAccordions: Record<string, boolean> = {};

  collection: AlbumCollection | undefined;
  errorMessage = '';
  breadcrumbItems: BreadcrumbItem[] = [];
  addModalOpen = false;
  addModalMessage = '';
  private addModalTimeout?: ReturnType<typeof setTimeout>;

  // Album list properties
  listModalOpen = false;
  userLists: AlbumList[] = [];
  isAddingToList = false;
  listSuccessMessage = '';
  listErrorMessage = '';

  ngOnInit(): void {
    const albumId = this.route.snapshot.params['id'];
    this.albumService.getAlbumById(albumId).subscribe((album) => {
      this.album = album;
      this.buildBreadcrumbItems();
      this.changeDetectorRef.markForCheck();
    });

    if (this.userService.isLoggedIn()) {
      this.loadCollection();
    }
  }

  private buildBreadcrumbItems(): void {
    const albumTitle = this.album?.title ?? '';
    const from = this.route.snapshot.queryParamMap.get('from');
    const artistId = this.route.snapshot.queryParamMap.get('artistId');
    const artistName = this.route.snapshot.queryParamMap.get('artistName') ?? 'Artist';

    switch (from) {
      case 'collection':
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'My Collection', link: '/user/collection' },
          { label: albumTitle },
        ];
        break;
      case 'artist':
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Search', link: '/search' },
          { label: artistName, link: artistId ? `/artist/details/${artistId}` : undefined },
          { label: albumTitle },
        ];
        break;
      case 'artist-albums':
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Search', link: '/search' },
          { label: artistName, link: artistId ? `/artist/details/${artistId}` : undefined },
          { label: 'Albums', link: artistId ? `/artist/details/${artistId}/albums` : undefined },
          { label: albumTitle },
        ];
        break;
      case 'notifications':
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Notifications', link: '/contributions/notifications' },
          { label: albumTitle },
        ];
        break;
      case 'album-list': {
        const listId = this.route.snapshot.queryParamMap.get('listId');
        const listName = this.route.snapshot.queryParamMap.get('listName') ?? 'List';
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'My Album Lists', link: '/album-lists' },
          { label: listName, link: listId ? `/album-lists/${listId}` : undefined },
          { label: albumTitle },
        ];
        break;
      }
      default:
        this.breadcrumbItems = [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Search', link: '/search' },
          { label: albumTitle },
        ];
    }
  }

  loadCollection(): void {
    this.albumCollectionService.getMyCollection().subscribe({
      next: (collection) => {
        this.collection = collection;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        console.error('Error loading collection:', err);
      }
    });
  }
  
  formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec.toString().padStart(2, '0')} sec`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    img.src = '/api/media/placeholders/album.svg';
  }

  onDetailsUpdate(event: CustomEvent<{ open: boolean }>): void {
    this.detailsOpen = event.detail.open;
    this.changeDetectorRef.markForCheck();
  }

  onAccordionUpdate(id: string, event: CustomEvent<{ open: boolean }>): void {
    this.openAccordions[id] = event.detail.open;
    this.changeDetectorRef.markForCheck();
  }

  addToCollection(versionId: string): void {
    this.errorMessage = '';
    if (this.addModalTimeout) {
      clearTimeout(this.addModalTimeout);
      this.addModalTimeout = undefined;
    }

    this.albumCollectionService.addVersion(versionId).subscribe({
      next: (collection) => {
        this.collection = collection;
        this.addModalMessage = 'Version added to your collection successfully!';
        this.addModalOpen = true;
        this.addModalTimeout = window.setTimeout(() => {
          this.closeAddModal();
        }, 1000);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error adding version to collection.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  closeAddModal(): void {
    this.addModalOpen = false;
    this.addModalMessage = '';
    if (this.addModalTimeout) {
      clearTimeout(this.addModalTimeout);
      this.addModalTimeout = undefined;
    }
    this.changeDetectorRef.markForCheck();
  }

  isVersionInCollection(versionId: string): boolean {
    if (!this.collection) return false;
    return this.collection.versions.some(v => v.version._id === versionId);
  }

  requestNewVersion(): void {
    const albumId = this.album?._id ?? this.album?.id;
    this.router.navigate(['/contributions/album-version/new'], {
      queryParams: { albumId },
    });
  }

  openAddToListModal(): void {
    this.listErrorMessage = '';
    this.listSuccessMessage = '';
    this.listModalOpen = true;
    this.changeDetectorRef.markForCheck();
    this.albumListService.getMyLists().subscribe({
      next: (lists) => {
        this.userLists = lists;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.listErrorMessage = err.error?.message || 'Error loading your lists.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  closeListModal(): void {
    this.listModalOpen = false;
    this.changeDetectorRef.markForCheck();
  }


  addAlbumToList(listId: string): void {
    const albumId = this.album?._id ?? this.album?.id;
    if (!albumId) return;
    this.listErrorMessage = '';
    this.listSuccessMessage = '';
    this.isAddingToList = true;
    this.albumListService.addAlbum(listId, albumId).subscribe({
      next: (updatedList) => {
        this.userLists = this.userLists.map(l => l._id === listId ? updatedList : l);
        this.isAddingToList = false;
        this.listSuccessMessage = `Album added to ${updatedList.name} successfully!`;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.listErrorMessage = err.error?.message || 'Error adding album to list.';
        this.isAddingToList = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  isAlbumInList(list: AlbumList): boolean {
    const albumId = this.album?._id ?? this.album?.id;
    if (!albumId) return false;
    return list.albums.some(item => {
      const id = typeof item.album === 'string' ? item.album : (item.album?._id ?? item.album?.id);
      return id === albumId;
    });
  }
}

