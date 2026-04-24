import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../artist-card/artist-card';
<<<<<<< HEAD
 
=======
import { ArtistService } from '../../artist.service';
import { ArtistInfo } from '../../artist';

>>>>>>> artist-integrar
@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [PorscheDesignSystemModule, ArtistCard],
  templateUrl: './artist-search.html',
  styles: ``,
})
<<<<<<< HEAD
export class ArtistSearch {
 
  artistFilteredList = [
    { artistName: "Zimbra", artistSince: 2010, artistId: "1" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "2" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "3" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "4" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "5" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "6" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "7" },
    { artistName: "Zimbra", artistSince: 2010, artistId: "8" },
  ];
 
=======
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

>>>>>>> artist-integrar
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
