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
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 },
  { artistName: "Zimbra", artistSince: 2010 }
];

  filter(event: Event) {
    const value = event.target as HTMLInputElement;
    console.log(value.value);
  }
}
