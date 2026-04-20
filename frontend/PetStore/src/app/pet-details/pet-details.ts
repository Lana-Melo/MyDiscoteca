import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { PetInfo } from '../pet';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-details',
  imports: [],
  template: `
    <!-- TODO(user-sprint-1): este componente pode ser o melhor candidato a
    virar "artist-details". A estrutura de ler o id da rota e buscar detalhes ja
    esta feita; faltaria trocar os campos e acrescentar o botao de favorito. -->
    <article>
      @if (petInfo) {
      <section class="listing-description">
        <h2 class="listing-heading">{{ petInfo.name }}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this pet</h2>
        <ul>
          <li>Category: {{ petInfo.category?.name }}</li> 
          <li>Status: {{ petInfo.status }}</li> 
          @for (tag of petInfo.tags; track $index) {
            <li>Tag: {{ tag.name }}</li>
          }
        </ul>
      </section>
      }
    </article>
  `,
  styleUrls: ['./pet-details.css'],
})

export class PetDetails {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  // TODO(user-sprint-1): trocar este service pelo ArtistService quando este
  // componente for convertido para a pagina de detalhe do artista.
  petService = inject(PetService);
  petInfo: PetInfo | undefined;

  ngOnInit(): void {
    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe((petInfo) => {
      this.petInfo = petInfo;
      this.changeDetectorRef.markForCheck();
    })

  }
}
