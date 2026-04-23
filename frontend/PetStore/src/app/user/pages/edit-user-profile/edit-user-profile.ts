import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { Router, RouterLink } from '@angular/router';
import { PasswordConfirmModal } from '../../components/password-confirm-modal/password-confirm-modal';
import { UserService } from '../../../user.service';
import { UserInfo } from '../../../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-profile',
  imports: [PorscheDesignSystemModule, PasswordConfirmModal, RouterLink, CommonModule, FormsModule],
  templateUrl: './edit-user-profile.html',
  styles: ``,
})
export class EditUserProfile implements OnInit {
  username = '';
  email = '';
  birthDate = '';
  favArtist = '';
  newPassword = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  router = inject(Router);
  userService = inject(UserService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  modalOpen = false;

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.getMe().subscribe({
      next: (user: UserInfo) => {
        this.username = user.username;
        this.email = user.email;
        this.birthDate = user.birthDate.split('T')[0]; ;
        if (typeof user.favoriteArtist === 'object' && user.favoriteArtist !== null) {
          this.favArtist = user.favoriteArtist.name || '';
        } else if (typeof user.favoriteArtist === 'string') {
          this.favArtist = user.favoriteArtist;
        }
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to load current user data';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  openConfirmModal() {
    if (!this.username || !this.email || !this.birthDate) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.errorMessage = '';
  }

  saveConfirmed(currentPassword: string) {
    if (!currentPassword?.trim()) {
      this.errorMessage = 'A password atual e obrigatoria para guardar alteracoes.';
      this.modalOpen = false;
      return;
    }

    this.modalOpen = false;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updatePayload: any = {
      username: this.username,
      email: this.email,
      birthDate: this.birthDate,
      currentPassword: currentPassword.trim()
    };

    if (this.newPassword) {
      updatePayload.password = this.newPassword;
    }

    this.userService.updateMe(updatePayload).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/user/profile']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update profile';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
