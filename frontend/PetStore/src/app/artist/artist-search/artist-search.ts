import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../artist-card/artist-card';
 
@Component({
  selector: 'app-artist-search',
  imports: [PorscheDesignSystemModule, ArtistCard],
  templateUrl: './artist-search.html',
  styles: ``,
})
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
 
  filter(event: Event) {
    const value = event.target as HTMLInputElement;
    console.log(value.value);
  }
}
