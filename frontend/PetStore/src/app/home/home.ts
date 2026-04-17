import {ChangeDetectorRef, Component, inject} from '@angular/core';
import { PetService } from '../pet.service';  
import { PetInfo } from '../pet';
import { PetCard } from '../pet-card/pet-card';
import { OnInit } from '@angular/core';
import { RouterOutlet,  RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PetCard, RouterLink],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by Pet Name" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
        <a [routerLink]="['/pets/new']" class="primary">Registar novo pet</a>      
      </form>
    </section>
    <section class="results">
      @for (petInfo of petsFilteredList; track $index) {
        <app-pet-card [petInfo]="petInfo" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})

export class Home implements OnInit {

  petsList: PetInfo[] = [];
  petsFilteredList: PetInfo[] = [];
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  petService: PetService = inject(PetService);

  ngOnInit(): void {
    this.petService
    .getAllPets()
    .subscribe((pets: PetInfo[]) => {

      this.petsList = pets;
      this.petsFilteredList = this.petsList;
      
      // serve para informar o Angular que ele precisa 
      // verificar se houve mudanças na view, já que a atualização da lista de pets acontece de 
      // forma assíncrona (após a resposta do servidor)
      this.changeDetectorRef.markForCheck(); 
    });
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