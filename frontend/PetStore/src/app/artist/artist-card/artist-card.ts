import { Component, input } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './artist-card.html',
  styles: ``,
})
export class ArtistCard {
  artistId = input<string>();
  artistName = input<string>();
  artistSince = input<number>();
  artistImg = input('/api/media/placeholders/artist.svg');
}
