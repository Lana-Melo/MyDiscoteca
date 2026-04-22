import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PetService } from '../pet.service';
import { PetInfo } from '../pet';
import { PetCard } from '../pet-card/pet-card';
import { OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterOutlet,  RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PetCard, RouterLink, PorscheDesignSystemModule],
  templateUrl: './home.html',
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
