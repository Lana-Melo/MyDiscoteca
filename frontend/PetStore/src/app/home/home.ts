import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PetService } from '../pet.service';
import { PetInfo } from '../pet';
import { PetCard } from '../pet-card/pet-card';
import { OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PetCard, RouterLink, PorscheDesignSystemModule],
  template: `
    <div class="grid-template">
      <div class="col-wide grid grid-cols-subgrid">
        <div class="col-span-two-thirds">
          <p-input-text
            placeholder="Filter by Pet Name"
            label="Pet Name"
            [value]="filterText"
            (input)="onFilterInput($event)">
          </p-input-text>
        </div>
        <div class="col-span-one-third" style="display: flex; align-items: flex-end; gap: 8px;">
          <p-button (click)="filterResults(filterText)">Search</p-button>
          <p-button variant="secondary" [routerLink]="['/pets/new']">Registar novo pet</p-button>
          <p-button-pure icon="user" [routerLink]="['/user/details']"></p-button-pure>
        </div>
      </div>

      <div class="col-wide grid grid-cols-subgrid">
        @for (petInfo of petsFilteredList; track $index) {
          <div class="col-span-one-quarter">
            <app-pet-card [petInfo]="petInfo" />
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./home.css'],
})

export class Home implements OnInit {
  petsList: PetInfo[] = [];
  petsFilteredList: PetInfo[] = [];
  filterText = '';

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  petService: PetService = inject(PetService);

  ngOnInit(): void {
    this.petService.getAllPets().subscribe((pets: PetInfo[]) => {
      this.petsList = pets;
      this.petsFilteredList = this.petsList;
      this.changeDetectorRef.markForCheck();
    });
  }

  onFilterInput(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
  }

  filterResults(text: string) {
    if (!text) {
      this.petsFilteredList = this.petsList;
      return;
    }
    this.petsFilteredList = this.petsList.filter((pet) =>
      pet.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}