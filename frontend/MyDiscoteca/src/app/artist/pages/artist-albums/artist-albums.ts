import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistAlbum, ArtistInfo } from '../../../models/artist';
import { ArtistService } from '../../../services/artist.service';

@Component({
  selector: 'artist-albums',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-button-pure icon="arrow-left" [routerLink]="['/artist/details', artist?.id ?? artist?._id]">
          Back to artist
        </p-button-pure>
      </div>

      @if (artist) {
      <div class="col-wide">
        <p-heading tag="h1">{{ artist.name }} Albums</p-heading>
      </div>
      <div class="col-wide">
        <p-text>Sorted by release year.</p-text>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        @for (album of sortedAlbums; track album._id) {
        <div class="col-span-one-half">
          <div class="album-card">
            <img
              class="album-image"
              [src]="album.imageUrl ?? '/api/media/placeholders/album.svg'"
              [alt]="album.title"
              (error)="handleImageError($event)"
            />
            <p-input-text [label]="album.releaseYear.toString()" [value]="album.title" [disabled]="true"></p-input-text>
          </div>
        </div>
        }
      </div>
      }
    </div>
  `,
  styles: `
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
  `,
})
export class ArtistAlbums implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly artistService = inject(ArtistService);

  artist: ArtistInfo | undefined;

  get sortedAlbums(): ArtistAlbum[] {
    return (this.artist?.albums ?? [])
      .slice()
      .sort((a, b) => a.releaseYear - b.releaseYear);
  }

  ngOnInit(): void {
    const artistId = this.route.snapshot.params['id'];
    this.artistService.getArtistById(artistId).subscribe((artist) => {
      this.artist = artist;
      this.changeDetectorRef.markForCheck();
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;

    if (!img) {
      return;
    }

    img.src = '/api/media/placeholders/album.svg';
  }
}
