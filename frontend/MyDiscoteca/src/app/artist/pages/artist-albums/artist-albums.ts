import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistAlbum, ArtistInfo } from '../../../models/artist';
import { ArtistService } from '../../../services/artist.service';
import { AlbumCard } from '../../../album/album-card/album-card';

@Component({
  selector: 'artist-albums',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink, AlbumCard],
  templateUrl: './artist-albums.html',
  styles: ``,
})
export class ArtistAlbums implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly artistService = inject(ArtistService);

  artist: ArtistInfo | undefined;
  from: string | null = null;

  get sortedAlbums(): ArtistAlbum[] {
    return (this.artist?.albums ?? [])
      .slice()
      .sort((a, b) => a.releaseYear - b.releaseYear);
  }

  ngOnInit(): void {
    this.from = this.route.snapshot.queryParamMap.get('from');
    const artistId = this.route.snapshot.params['id'];
    this.artistService.getArtistById(artistId).subscribe((artist) => {
      this.artist = artist;
      this.changeDetectorRef.markForCheck();
    });
  }

}
