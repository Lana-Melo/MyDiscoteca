import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { Router, RouterLink } from '@angular/router';
import { PasswordConfirmModal } from '../../components/password-confirm-modal/password-confirm-modal';
import { UserService } from '../../../services/user.service';
import { UpdateUserPayload, UserInfo } from '../../../models/user';
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
  warningOpen = false;
  warningMessages: string[] = [];
  
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
    const validationMessages = this.validateProfileFields();

    if (validationMessages.length > 0) {
      this.showWarning(validationMessages);
      return;
    }

    this.errorMessage = '';
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.errorMessage = '';
  }

  closeWarning() {
    this.warningOpen = false;
  }

  saveConfirmed(currentPassword: string) {
    if (!currentPassword?.trim()) {
      this.showWarning(['A password atual e obrigatoria para guardar alteracoes.']);
      this.modalOpen = false;
      return;
    }

    this.modalOpen = false;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updatePayload: UpdateUserPayload = {
      username: this.username.trim(),
      email: this.email.trim(),
      birthDate: this.birthDate,
      currentPassword: currentPassword.trim()
    };

    if (this.newPassword.trim()) {
      updatePayload.password = this.newPassword.trim();
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
        this.showWarning(this.extractWarningMessages(err));
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private validateProfileFields(): string[] {
    const messages: string[] = [];
    const username = this.username.trim();
    const email = this.email.trim();

    if (!username) {
      messages.push('O username e obrigatorio.');
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
      messages.push('O username so pode ter letras e numeros.');
    }

    if (!email) {
      messages.push('O email e obrigatorio.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      messages.push('O email tem de estar num formato valido.');
    }

    if (!this.birthDate) {
      messages.push('A data de nascimento e obrigatoria.');
    } else if (!this.isAtLeast13YearsOld(this.birthDate)) {
      messages.push('O utilizador tem de ter pelo menos 13 anos.');
    }

    return messages;
  }

  private isAtLeast13YearsOld(birthDateValue: string): boolean {
    const birthDate = new Date(birthDateValue);

    if (Number.isNaN(birthDate.getTime())) {
      return false;
    }

    const today = new Date();
    const minimumBirthDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );

    return birthDate <= minimumBirthDate;
  }

  private extractWarningMessages(err: any): string[] {
    if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
      return err.error.errors;
    }

    return [err.error?.message || 'Failed to update profile'];
  }

  private showWarning(messages: string[]) {
    this.warningMessages = messages;
    this.warningOpen = true;
    this.errorMessage = '';
  }
}
