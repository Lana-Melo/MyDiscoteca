import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumInfo } from '../../../models/album';
import { AlbumService } from '../../../services/album.service';
import { AlbumCollectionService } from '../../../services/album-collection.service';
import { UserService } from '../../../services/user.service';
import { AlbumCollection } from '../../../models/album-collection';

@Component({
  selector: 'album-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
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
  public readonly userService = inject(UserService);

  album: AlbumInfo | undefined;
  detailsOpen = false;
  openAccordions: Record<string, boolean> = {};
  
  collection: AlbumCollection | undefined;
  errorMessage = '';
  backLink = '/search';
  backLabel = 'Back to search';
  addModalOpen = false;
  addModalMessage = '';
  private addModalTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    const from = this.route.snapshot.queryParamMap.get('from');
    if (from === 'collection') {
      this.backLink = '/user/collection';
      this.backLabel = 'Back to collection';
    } else if (from === 'artist') {
      const artistId = this.route.snapshot.queryParamMap.get('artistId');
      if (artistId) {
        this.backLink = `/artist/details/${artistId}`;
        this.backLabel = 'Back to artist';
      }
    } else if (from === 'artist-albums') {
      const artistId = this.route.snapshot.queryParamMap.get('artistId');
      if (artistId) {
        this.backLink = `/artist/details/${artistId}/albums`;
        this.backLabel = 'Back to artist albums';
      }
    }

    const albumId = this.route.snapshot.params['id'];
    this.albumService.getAlbumById(albumId).subscribe((album) => {
      this.album = album;
      this.changeDetectorRef.markForCheck();
    });

    if (this.userService.isLoggedIn()) {
      this.loadCollection();
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
}

