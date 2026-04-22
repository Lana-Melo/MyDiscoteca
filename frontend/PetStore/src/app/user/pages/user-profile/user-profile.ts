import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'user-profile',
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './user-profile.html',
  styles: ``,
})
export class UserProfile {
  username = "Jhonny Boy"
  email = "jhonny@bigtech.com"
  birthDate = "26/02/2000"
  favArtist = "Barões da Pisadinha"
}
