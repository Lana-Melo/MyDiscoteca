import { Component, inject } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { Router, RouterLink} from '@angular/router';
import { PasswordConfirmModal } from '../../components/password-confirm-modal/password-confirm-modal';

@Component({
  selector: 'app-edit-user-profile',
  imports: [PorscheDesignSystemModule, PasswordConfirmModal, RouterLink],
  templateUrl: './edit-user-profile.html',
  styles: ``,
})
export class EditUserProfile {
  username = "Jhonny Boy"
  email = "jhonny@bigtech.com"
  birthDate = "26/02/2000"
  favArtist = "Barões da Pisadinha"
  
  router = inject(Router);

  modalOpen = false;

  openConfirmModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  saveConfirmed() {
    this.modalOpen = false;
    console.log('guardar dados');
    this.router.navigate(['/user/profile']);
  }
}
