import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistAlbum, ArtistInfo } from '../../../models/artist';
import { UserService } from '../../../services/user.service';
import { UserInfo } from '../../../models/user';
import { ArtistService } from '../../../services/artist.service';

@Component({
  selector: 'artist-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-basic">
        <p-button-pure icon="arrow-left" [routerLink]="[backLink]">{{ backLabel }}</p-button-pure>
      </div>
      @if (artist) {
      <div class="col-basic">
        <p-heading tag="h1">{{artist.name}}</p-heading>
      </div>
      <div class="col-basic">
        <img
          class="artist-image"
          [src]="artist.imageUrl ?? '/api/media/placeholders/artist.svg'"
          [alt]="artist.name"
          (error)="handleImageError($event, 'artist')"
        />
      </div>
      <div class="col-basic grid grid-cols-subgrid">
        <div class="col-span-one-half">
          <p-input-text label="ISNI" [value]="artist.isni" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Active Since" [value]="artist.yearStarted.toString()" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Type" [value]="artist.type" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-button-pure [active]="isFavorite" [disabled]="isSavingFavorite" (click)="toggleFavorite()">
            {{ isFavorite ? 'Remove from favorites' : 'Add as favorite' }}
          </p-button-pure>
        </div>
      </div>
      @if (favoriteMessage) {
      <div class="col-basic">
        <p-text color="notification-success">{{ favoriteMessage }}</p-text>
      </div>
      }
      @if (favoriteError) {
      <div class="col-basic">
        <p-text color="notification-error">{{ favoriteError }}</p-text>
      </div>
      }
      @if (artist.members && artist.members.length > 0) {
      <div class="col-basic">
        <p-heading size="medium" tag="h2">Members</p-heading>
      </div>
      <div class="col-basic grid grid-cols-subgrid">
        @for (member of artist.members; track member._id) {
        <div class="col-span-one-half">
          <p-input-text [label]="member.type" [value]="member.name" [disabled]="true"></p-input-text>
        </div>
        }
      </div>
      }
      @if (artist.albums && artist.albums.length > 0) {
      <div class="col-basic">
        <p-heading size="medium" tag="h2">Albums</p-heading>
      </div>
      <div class="col-basic grid grid-cols-subgrid">
        @for (album of visibleAlbums; track album._id) {
        <div class="col-span-one-third">
          <div class="album-card">
            <a [routerLink]="['/album/details', album._id]" [queryParams]="{ from: 'artist', artistId: artist.id ?? artist._id }" style="display: block;">
              <img
                class="album-image"
                [src]="album.imageUrl ?? '/api/media/placeholders/album.svg'"
                [alt]="album.title"
                (error)="handleImageError($event, 'album')"
              />
            </a>
            <a [routerLink]="['/album/details', album._id]" [queryParams]="{ from: 'artist', artistId: artist.id ?? artist._id }" style="text-decoration: none; display: block;">
              <p-input-text [label]="album.releaseYear.toString()" [value]="album.title" [disabled]="true" style="pointer-events: none;"></p-input-text>
            </a>
          </div>
        </div>
        }
      </div>
      <div class="col-basic albums-actions">
        <a [routerLink]="['/artist/details', artist.id ?? artist._id, 'albums']" [queryParams]="{ from: from }">
          <p-button-pure icon="arrow-head-right">See all albums</p-button-pure>
        </a>
      </div>
      }
      }
      <p-modal [open]="overwriteFavoriteOpen" [aria]="{'aria-label': 'Overwrite favorite artist'}" (dismiss)="cancelOverwriteFavorite()">
        <p-heading slot="header" size="large" tag="h2">
          Favorite artist
        </p-heading>

        <p-text>
          You already have {{ currentFavoriteArtistName }} as your favorite artist, do you want to overwrite?
        </p-text>

        <p-button-group slot="footer">
          <p-button type="button" (click)="confirmOverwriteFavorite()">yes, overwrite</p-button>
          <p-button type="button" variant="secondary" (click)="cancelOverwriteFavorite()">no, cancel</p-button>
        </p-button-group>
      </p-modal>
    </div>
  `,
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
  backLink = '/search';
  backLabel = 'Back to search';
  from: string | null = null;

  get visibleAlbums(): ArtistAlbum[] {
    return (this.artist?.albums ?? [])
      .slice()
      .sort((a, b) => a.releaseYear - b.releaseYear)
      .slice(0, 5);
  }

  ngOnInit(): void {
    this.from = this.route.snapshot.queryParamMap.get('from');
    if (this.from === 'profile') {
      this.backLink = '/user/profile';
      this.backLabel = 'Back to profile';
    } else if (this.from === 'dashboard') {
      this.backLink = '/dashboard';
      this.backLabel = 'Back to dashboard';
    } else if (this.from === 'album') {
      const albumId = this.route.snapshot.queryParamMap.get('albumId');
      this.backLink = `/album/details/${albumId}`;
      this.backLabel = 'Back to album';
    }

    const artistId = this.route.snapshot.params['id'];
    this.artistService.getArtistById(artistId).subscribe((artist) => {
      this.artist = artist;
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
