import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../pet.service';
import { PetInfo } from '../pet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pet',
  imports: [ReactiveFormsModule],
  template: `
      <!-- TODO(user-sprint-1): este e provavelmente o melhor ponto para
      reaproveitar a estrutura do formulario e transformá-la em criacao de conta
      de utilizador, com username, email, password e birthDate. -->
      <section class="listing-apply">
        <h2 class="section-heading">Register New Pet</h2>
        <form [formGroup]="registerPetForm" (submit)="registerPet()">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name"/>
          <label for="category">Category</label>
          <input id="category" type="text" formControlName="category"/>
          <button type="submit" class="primary">Register Pet</button>
        </form>
      </section>
  `,
  styleUrls: ['./register-pet.css'],
})

export class RegisterPet {
  router = inject(Router);
  // TODO(user-sprint-1): trocar a dependencia atual por AuthService/UserService
  // quando este componente passar a fazer registo de conta.
  petService = inject(PetService);
  registerPetForm = new FormGroup({
    // TODO(user-sprint-1): aqui vao entrar os controlos reais do utilizador e
    // as validacoes do enunciado (username alfanumerico, password forte, idade >= 13).
    name: new FormControl('', Validators.required),
    category: new FormControl(''),
    status: new FormControl(''),
  });


  registerPet() {
    if (this.registerPetForm.valid) {
      const newPet: PetInfo = {
        name: this.registerPetForm.value.name!,
        category: { name: this.registerPetForm.value.category! },
        status: 'available',
        photoUrls: ['string'],
        tags: [{ name: 'string' }],
      };

      this.petService.registerPet(newPet).subscribe(
        () => { // Quando o resultado do pedido POST é recebido pelo Observable, este bloco é executado
          this.registerPetForm.reset(); // Limpa o formulário
          alert('Pet registered successfully!');
          this.router.navigate(['/pets']);
        })
    }
  }
}
