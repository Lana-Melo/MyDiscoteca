import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../../artist/components/artist-card/artist-card';
import { AlbumCard } from '../../album/album-card/album-card';
import { ArtistInfo } from '../../models/artist';
import { AlbumInfo } from '../../models/album';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { SearchStateService, SearchMode } from '../../services/search-state.service';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-artist-and-album-search',
  standalone: true,
  imports: [RouterModule, PorscheDesignSystemModule, ArtistCard, AlbumCard, Breadcrumb],
  templateUrl: './artist-and-album-search.html',
  styles: ``,
})
export class ArtistAndAlbumSearch implements OnInit {
  searchMode: SearchMode = 'artist';
  searchQuery: string = '';

  artistList: ArtistInfo[] = [];
  artistFilteredList: ArtistInfo[] = [];

  albumList: AlbumInfo[] = [];
  albumFilteredList: AlbumInfo[] = [];

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly artistService = inject(ArtistService);
  private readonly albumService = inject(AlbumService);
  private readonly searchStateService = inject(SearchStateService);

  ngOnInit(): void {
    // Restore state if available
    if (this.searchStateService.hasData) {
      this.searchMode = this.searchStateService.searchMode;
      this.searchQuery = this.searchStateService.searchQuery;
      this.artistFilteredList = this.searchStateService.artistResults;
      this.albumFilteredList = this.searchStateService.albumResults;
    }

    // Always fetch the full lists for background filtering if needed
    this.artistService.getAllArtists().subscribe((artists: ArtistInfo[]) => {
      this.artistList = artists;
      if (!this.searchStateService.hasData || !this.searchQuery) {
        if (!this.searchQuery) this.artistFilteredList = artists;
      }
      this.changeDetectorRef.markForCheck();
    });

    this.albumService.getAllAlbums().subscribe((albums: AlbumInfo[]) => {
      this.albumList = albums;
      if (!this.searchStateService.hasData || !this.searchQuery) {
        if (!this.searchQuery) this.albumFilteredList = albums;
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  onModeChange(event: Event): void {
    this.searchMode = (event.target as HTMLElement & { value: SearchMode }).value;
    this.saveState();
    this.changeDetectorRef.markForCheck();
  }

  saveState(): void {
    this.searchStateService.saveState(
      this.searchMode,
      this.searchQuery,
      this.artistFilteredList,
      this.albumFilteredList
    );
  }

  filter(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.saveState();

    if (this.searchMode === 'artist') {
      if (!this.searchQuery) {
        this.artistFilteredList = this.artistList;
        this.saveState();
        this.changeDetectorRef.markForCheck();
        return;
      }
      this.artistService.searchArtists(this.searchQuery).subscribe((artists: ArtistInfo[]) => {
        this.artistFilteredList = artists;
        this.saveState();
        this.changeDetectorRef.markForCheck();
      });
    } else {
      if (!this.searchQuery) {
        this.albumFilteredList = this.albumList;
        this.saveState();
        this.changeDetectorRef.markForCheck();
        return;
      }
      this.albumService.searchAlbums(this.searchQuery).subscribe((albums: AlbumInfo[]) => {
        this.albumFilteredList = albums;
        this.saveState();
        this.changeDetectorRef.markForCheck();
      });
    }
  }
}
