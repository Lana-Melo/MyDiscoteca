import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../../artist/components/artist-card/artist-card';
import { AlbumCard } from '../../album/album-card/album-card';
import { ArtistInfo } from '../../models/artist';
import { AlbumInfo } from '../../models/album';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';

type SearchMode = 'artist' | 'album';

@Component({
  selector: 'app-artist-and-album-search',
  standalone: true,
  imports: [PorscheDesignSystemModule, ArtistCard, AlbumCard],
  templateUrl: './artist-and-album-search.html',
  styles: ``,
})
export class ArtistAndAlbumSearch implements OnInit {
  searchMode: SearchMode = 'artist';

  artistList: ArtistInfo[] = [];
  artistFilteredList: ArtistInfo[] = [];

  albumList: AlbumInfo[] = [];
  albumFilteredList: AlbumInfo[] = [];

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly artistService = inject(ArtistService);
  private readonly albumService = inject(AlbumService);

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe((artists: ArtistInfo[]) => {
      this.artistList = artists;
      this.artistFilteredList = artists;
      this.changeDetectorRef.markForCheck();
    });

    this.albumService.getAllAlbums().subscribe((albums: AlbumInfo[]) => {
      this.albumList = albums;
      this.albumFilteredList = albums;
      this.changeDetectorRef.markForCheck();
    });
  }

  onModeChange(event: Event): void {
    this.searchMode = (event.target as HTMLElement & { value: SearchMode }).value;
    this.changeDetectorRef.markForCheck();
  }

  filter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (this.searchMode === 'artist') {
      if (!value) {
        this.artistFilteredList = this.artistList;
        this.changeDetectorRef.markForCheck();
        return;
      }
      this.artistService.searchArtists(value).subscribe((artists: ArtistInfo[]) => {
        this.artistFilteredList = artists;
        this.changeDetectorRef.markForCheck();
      });
    } else {
      if (!value) {
        this.albumFilteredList = this.albumList;
        this.changeDetectorRef.markForCheck();
        return;
      }
      this.albumService.searchAlbums(value).subscribe((albums: AlbumInfo[]) => {
        this.albumFilteredList = albums;
        this.changeDetectorRef.markForCheck();
      });
    }
  }
}
