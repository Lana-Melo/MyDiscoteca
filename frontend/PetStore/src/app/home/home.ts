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
    <!-- TODO(user-sprint-1): esta pagina pode ser reaproveitada de duas formas:
    1) dashboard provisoria apos login; ou
    2) pesquisa de artistas, trocando a lista de pets pela de artistas. -->
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

  // TODO(user-sprint-1): estes estados ainda pertencem ao pet store. Se esta
  // pagina virar pesquisa de artistas, o refactor principal acontece aqui:
  // artistsList, artistsFilteredList e injecao de ArtistService.
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
