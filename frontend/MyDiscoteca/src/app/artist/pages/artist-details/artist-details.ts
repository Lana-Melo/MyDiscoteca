import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistAlbum, ArtistInfo } from '../../../models/artist';
import { UserService } from '../../../services/user.service';
import { UserInfo } from '../../../models/user';
import { ArtistService } from '../../../services/artist.service';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import { AlbumCard } from '../../../album/album-card/album-card';

@Component({
  selector: 'artist-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink, Breadcrumb, AlbumCard],
  templateUrl: './artist-details.html',
  styles: `
    .artist-image {
      width: 100%;
      max-width: 24rem;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 1rem;
      display: block;
    }

    .album-card {
      display: grid;
      gap: 0.75rem;
    }

    .album-image {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 0.75rem;
      display: block;
    }

    .albums-actions {
      margin-top: 1rem;
    }
  `,
})
export class ArtistDetails implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  artistService: ArtistService = inject(ArtistService);
  userService: UserService = inject(UserService);

  artist: ArtistInfo | undefined;
  user: UserInfo | undefined;
  isFavorite = false;
  isSavingFavorite = false;
  favoriteMessage = '';
  favoriteError = '';
  overwriteFavoriteOpen = false;
  pendingFavoriteArtistId: string | null = null;
  breadcrumbItems: BreadcrumbItem[] = [];
  from: string | null = null;

  get visibleAlbums(): ArtistAlbum[] {
    return (this.artist?.albums ?? [])
      .slice()
      .sort((a, b) => a.releaseYear - b.releaseYear)
      .slice(0, 5);
  }

  ngOnInit(): void {
    this.from = this.route.snapshot.queryParamMap.get('from');

    const artistId = this.route.snapshot.params['id'];
    this.artistService.getArtistById(artistId).subscribe((artist) => {
      this.artist = artist;
      this.buildBreadcrumbItems();
      this.updateFavoriteState();
      this.changeDetectorRef.markForCheck();
    });

    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.updateFavoriteState();
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.favoriteError = 'Could not load the current user.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  buildBreadcrumbItems(): void {
    const artistName = this.artist?.name ?? '';

    if (this.from === 'profile') {
      this.breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Profile', link: '/user/profile' },
        { label: artistName },
      ];
    } else if (this.from === 'dashboard') {
      this.breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: artistName },
      ];
    } else if (this.from === 'album') {
      const albumId = this.route.snapshot.queryParamMap.get('albumId');
      const albumTitle = this.route.snapshot.queryParamMap.get('albumTitle') ?? 'Album';
      this.breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Search', link: '/search' },
        { label: albumTitle, link: albumId ? `/album/details/${albumId}` : undefined },
        { label: artistName },
      ];
    } else {
      this.breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Search', link: '/search' },
        { label: artistName },
      ];
    }
  }

  toggleFavorite() {
    const artistId = this.artist?.id || this.artist?._id;

    if (!artistId || this.isSavingFavorite) {
      return;
    }

    if (this.isFavorite) {
      this.saveFavoriteArtist(null);
      return;
    }

    if (this.user?.favoriteArtist) {
      this.pendingFavoriteArtistId = artistId;
      this.overwriteFavoriteOpen = true;
      this.favoriteMessage = '';
      this.favoriteError = '';
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.saveFavoriteArtist(artistId);
  }

  confirmOverwriteFavorite() {
    if (!this.pendingFavoriteArtistId) {
      return;
    }

    this.overwriteFavoriteOpen = false;
    this.saveFavoriteArtist(this.pendingFavoriteArtistId);
    this.pendingFavoriteArtistId = null;
  }

  cancelOverwriteFavorite() {
    this.overwriteFavoriteOpen = false;
    this.pendingFavoriteArtistId = null;
    this.changeDetectorRef.markForCheck();
  }

  get currentFavoriteArtistName(): string {
    const favoriteArtist = this.user?.favoriteArtist;

    if (!favoriteArtist) {
      return '';
    }

    if (typeof favoriteArtist === 'string') {
      return favoriteArtist;
    }

    return favoriteArtist.name;
  }

  private saveFavoriteArtist(favoriteArtist: string | null) {
    this.isSavingFavorite = true;
    this.favoriteMessage = '';
    this.favoriteError = '';

    this.userService.updateMe({ favoriteArtist }).subscribe({
      next: (user) => {
        this.user = user;
        this.isSavingFavorite = false;
        this.updateFavoriteState();
        this.favoriteMessage = this.isFavorite
          ? 'Favorite artist updated.'
          : 'Artist removed from favorites.';
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.isSavingFavorite = false;
        this.favoriteError = err.error?.message || 'Could not update favorite artist.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private updateFavoriteState() {
    const artistId = this.artist?.id || this.artist?._id;
    const favoriteArtist = this.user?.favoriteArtist;

    if (!artistId || !favoriteArtist) {
      this.isFavorite = false;
      return;
    }

    if (typeof favoriteArtist === 'string') {
      this.isFavorite = favoriteArtist === artistId;
      return;
    }

    this.isFavorite = favoriteArtist.id === artistId || favoriteArtist._id === artistId;
  }

  handleImageError(event: Event, type: 'artist' | 'album'): void {
    const img = event.target as HTMLImageElement | null;

    if (!img) {
      return;
    }

    img.src = type === 'artist'
      ? '/api/media/placeholders/artist.svg'
      : '/api/media/placeholders/album.svg';
  }
}
