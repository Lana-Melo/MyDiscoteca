import { Component, input, output } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-password-confirm-modal',
  imports: [PorscheDesignSystemModule],
  template: `
      <p-modal [open]="open()" [aria]="{'aria-label': 'Some Heading'}" (dismiss)="close.emit()">
          
          <p-heading slot="header" size="large" tag="h2">
              Password requested
          </p-heading>
          
          <p-text>Please enter your current password to proceed.</p-text>
          <p-input-password
            label="Current Password"
            name="password"
            [toggle]="true"
            [value]="currentPassword"
            (input)="onPasswordInput($event)">
          </p-input-password>

          <p-button-group slot="footer">
              <p-button type="button" (click)="onConfirm()">Save</p-button>
              <p-button type="button" variant="secondary" (click)="close.emit()">Cancel</p-button>
          </p-button-group>
      </p-modal>
  `,
  styles: ``,
})
export class PasswordConfirmModal { // componente filho

  open = input<boolean>(false); // Propriedade do componente filho pode receber valores do componente pai
  confirm = output<string>();  // Componente filho lança evento com a password
  close = output<void>(); // Componente filho lança eventos que notificam o pai de mudanças nos dados
  currentPassword = '';

  onPasswordInput(event: Event) {
    this.currentPassword = (event.target as HTMLInputElement).value ?? '';
  }

  onConfirm() {
    this.confirm.emit(this.currentPassword);
    this.currentPassword = '';
  }
}
