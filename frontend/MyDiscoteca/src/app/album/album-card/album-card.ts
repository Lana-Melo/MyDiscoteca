import { Component, input } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [PorscheDesignSystemModule],
  templateUrl: './album-card.html',
  styles: ``,
})
export class AlbumCard {
  albumId = input<string>();
  albumTitle = input<string>();
  albumYear = input<number>();
  albumImg = input('/api/media/placeholders/album.svg');
  artistName = input<string>();

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    img.src = '/api/media/placeholders/album.svg';
  }
}
