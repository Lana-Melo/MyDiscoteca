import {Component, input} from '@angular/core';
import { RouterOutlet,  RouterLink} from '@angular/router';
import { PetInfo } from '../pet';

@Component({
  selector: 'app-pet-card',
  imports: [RouterLink],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ petInfo().name }}</h2>
      <p class="listing-location">Category: {{ petInfo().category?.name }} - Status: {{ petInfo().status }}</p>
      <a [routerLink]="['/pets/details', petInfo()._id]">Learn More</a>
    </section>
  `,

  styleUrls: ['./pet-card.css'],
})
export class PetCard {
  petInfo = input.required<PetInfo>(); 
}
