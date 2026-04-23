import { Component, computed, input } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-artist-card',
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './artist-card.html',
  styles: ``,
})
export class ArtistCard {
  artistName = input<string>();
  artistSince = input<number>();
  artistId = input<string>();
  artistImg = computed(() => `assets/${this.artistName()}.jpg`);
}
