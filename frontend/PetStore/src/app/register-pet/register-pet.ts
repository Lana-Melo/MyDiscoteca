  import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
  import { PetService } from '../pet.service';
  import { PetInfo } from '../pet';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-register-pet',
    imports: [ReactiveFormsModule, PorscheDesignSystemModule],
    template: `
        <div class="grid-template">
          <section class="col-wide listing-apply">
            <h2 class="section-heading">Register New Pet</h2>
            <form [formGroup]="registerPetForm" (submit)="registerPet()" class="col-wide grid grid-cols-subgrid gap-y-fluid-md">
              <div class="col-span-one-half p-fluid-sm">
                <!-- Commenting to test the porshe component
                <label for="name">Name</label>
                <input id="name" type="text" formControlName="name"/> 
                -->
                <p-input-text label="Name" [value]="registerPetForm.get('name')?.value??''" 
                (input)="onNameInput($event)">
                </p-input-text>
                <!--
                Explicacao: para usar o p-input-text (component do Porshe Design System)
                não podemos usar o atributo formControlName que usávamos no campo <input> nativo
                do html, e portanto temos de fazer os bindings:

                - event binding: (input) template -> classe
                diz que quando houver o evento input neste campo,
                deve-se redirecionar para o handler descrito entre aspas 
                - "onNameInput()" -, que neste caso é uma função quee preenche o
                campo 'name' do registerPetForm da classe RegisterPet com o valor que foi 
                inserido no p-input-text

                - property binding: [value] classe -> template
                diz que o valor deste campo deve ser igual ao campo "registerPetForm.get('name')?.value" 
                (ou string vazio caso seja null ou undefined)
                da classe. Isto é relevante para, por exemplo, depois de submeter o registo,
                caso não tivéssemos o redirect do para o pets, o campo ia continuar a exibir
                o texto inputado pelo user ao invés de ser cleaned up
                -->
              </div>
              <div class="col-span-one-half p-fluid-sm">
                <label for="category">Category</label>
                <input id="category" type="text" formControlName="category"/> 
              </div>
              <button type="submit" class="primary">Register Pet</button>
            </form>
          </section>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./register-pet.css'],
  })

  export class RegisterPet {
    router = inject(Router);
    petService = inject(PetService);
    registerPetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl(''),
      status: new FormControl(''),
    });

    onNameInput(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.registerPetForm.get('name')?.setValue(value);
    }

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
