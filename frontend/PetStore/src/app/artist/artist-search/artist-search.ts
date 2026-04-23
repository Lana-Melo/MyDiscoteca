import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../artist-card/artist-card';
import { ArtistService } from '../../artist.service';
import { ArtistInfo } from '../../artist';

@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [PorscheDesignSystemModule, ArtistCard],
  templateUrl: './artist-search.html',
  styles: ``,
})
export class ArtistSearch implements OnInit {
  artistList: ArtistInfo[] = [];
  artistFilteredList: ArtistInfo[] = [];

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  artistService: ArtistService = inject(ArtistService);

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe((artists: ArtistInfo[]) => {
      this.artistList = artists;
      this.artistFilteredList = this.artistList;
      this.changeDetectorRef.markForCheck();
    });
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.artistFilteredList = this.artistList;
      this.changeDetectorRef.markForCheck();
      return;
    }
    // Usa o endpoint de pesquisa do backend
    this.artistService.searchArtists(value).subscribe((artists: ArtistInfo[]) => {
      this.artistFilteredList = artists;
      this.changeDetectorRef.markForCheck();
    });
  }
}
