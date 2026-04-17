import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { PetInfo } from '../pet';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-details',
  imports: [],
  template: `
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
