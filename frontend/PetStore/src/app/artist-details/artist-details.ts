import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'artist-details',
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-button-pure icon="arrow-left" [routerLink]="['/user/profile']">Back to profile</p-button-pure>
      </div>
      <div class="col-wide">
        <p-heading>{{favArtist}}</p-heading>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        <div class="col-span-one-half">
          <p-input-text label="ISNI" [value]="artistIsni" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Active Since" [value]="artistActiveSince" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Type" [value]="artistType" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-button-pure [active]="isFavorite" (click)="toggleFavorite()">
            {{ isFavorite ? 'Remove from favorites' : 'Add as favorite' }}
          </p-button-pure>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ArtistDetails {
  isFavorite = true;

  favArtist = 'Barões da Pisadinha';
  artistIsni = '0000 0004 9562 8417';
  artistActiveSince = '2018';
  artistType = 'Group';

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}