import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'user-details',
  imports: [PorscheDesignSystemModule],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-heading>Hello, {{username}}</p-heading>  
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        <div class="col-span-one-half">
          <p-input-text label="Name" [value]="username" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Email" [value]="email" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-date label="Birth Date" [value]="birthDate" [disabled]="true"></p-input-date>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Favorite Artist" [value]="favArtist" [disabled]="true"></p-input-text>
          <p-button-pure>
            Go to artist profile
          </p-button-pure>
        </div>
        <div class="col-span-one-half">
          <p-button>
            Edit profile
          </p-button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class UserDetails {
  username = "Jhonny Boy"
  email = "jhonny@bigtech.com"
  birthDate = "26/02/2000"
  favArtist = "Barões da Pisadinha"
}
