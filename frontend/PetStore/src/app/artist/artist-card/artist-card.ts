import { Component, computed, input } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-artist-card',
  imports: [PorscheDesignSystemModule],
  templateUrl: '/artist-card.html',
  styles: ``,
})
export class ArtistCard {
  artistName = input<string>();
  artistSince = input<number>();
  artistImg = computed(() => `assets/${this.artistName()}.jpg`);
}
