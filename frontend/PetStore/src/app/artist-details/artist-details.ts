import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistService } from '../artist.service';
import { ArtistInfo } from '../artist';

@Component({
  selector: 'artist-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-button-pure icon="arrow-left" [routerLink]="['/artists']">Back to artists</p-button-pure>
      </div>
      @if (artist) {
      <div class="col-wide">
        <p-heading>{{artist.name}}</p-heading>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
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
          <p-button-pure [active]="isFavorite" (click)="toggleFavorite()">
            {{ isFavorite ? 'Remove from favorites' : 'Add as favorite' }}
          </p-button-pure>
        </div>
      </div>
      @if (artist.members && artist.members.length > 0) {
      <div class="col-wide">
        <p-heading size="medium">Members</p-heading>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        @for (member of artist.members; track member._id) {
        <div class="col-span-one-half">
          <p-input-text [label]="member.type" [value]="member.name" [disabled]="true"></p-input-text>
        </div>
        }
      </div>
      }
      @if (artist.albums && artist.albums.length > 0) {
      <div class="col-wide">
        <p-heading size="medium">Albums</p-heading>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        @for (album of artist.albums; track album._id) {
        <div class="col-span-one-half">
          <p-input-text [label]="album.releaseYear.toString()" [value]="album.title" [disabled]="true"></p-input-text>
        </div>
        }
      </div>
      }
      }
    </div>
  `,
  styles: ``,
})
export class ArtistDetails implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  artistService: ArtistService = inject(ArtistService);

  artist: ArtistInfo | undefined;
  isFavorite = false;

  ngOnInit(): void {
    const artistId = this.route.snapshot.params['id'];
    this.artistService.getArtistById(artistId).subscribe((artist) => {
      this.artist = artist;
      this.changeDetectorRef.markForCheck();
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}