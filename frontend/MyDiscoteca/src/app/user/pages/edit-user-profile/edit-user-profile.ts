import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
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

  usernameError = signal('');
  emailError = signal('');
  birthDateError = signal('');
  newPasswordError = signal('');
  
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
    this.usernameError.set('');
    this.emailError.set('');
    this.birthDateError.set('');
    this.newPasswordError.set('');

    const isValid = this.validateProfileFields();

    if (!isValid) {
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
      this.showWarning(['Current password is required to save changes.']);
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
        this.router.navigate(['/user/profile'], {
          state: { successMessage: this.successMessage }
        });
      },
      error: (err) => {
        this.handleBackendErrors(err);
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private validateProfileFields(): boolean {
    let valid = true;
    const username = this.username.trim();
    const email = this.email.trim();

    if (!username) {
      this.usernameError.set('Username is required.');
      valid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
      this.usernameError.set('Username can only contain letters and numbers.');
      valid = false;
    }

    if (!email) {
      this.emailError.set('Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.emailError.set('Email must be in a valid format.');
      valid = false;
    }

    if (!this.birthDate) {
      this.birthDateError.set('Birth date is required.');
      valid = false;
    } else if (!this.isAtLeast13YearsOld(this.birthDate)) {
      this.birthDateError.set('User must be at least 13 years old.');
      valid = false;
    }

    if (this.newPassword.trim() && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.newPassword.trim())) {
      this.newPasswordError.set('Password must have at least 8 characters, including uppercase, lowercase, and a number.');
      valid = false;
    }

    return valid;
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

  private handleBackendErrors(err: any): void {
    const messages: string[] = Array.isArray(err.error?.errors) && err.error.errors.length > 0
      ? err.error.errors
      : [err.error?.message || 'Failed to update profile'];

    const unhandled: string[] = [];

    for (const msg of messages) {
      const lower = msg.toLowerCase();
      if (lower.includes('username')) {
        this.usernameError.set(msg);
      } else if (lower.includes('email')) {
        this.emailError.set(msg);
      } else if (lower.includes('password')) {
        this.newPasswordError.set(msg);
      } else if (lower.includes('birth')) {
        this.birthDateError.set(msg);
      } else {
        unhandled.push(msg);
      }
    }

    if (unhandled.length > 0) {
      this.showWarning(unhandled);
    }
  }

  private showWarning(messages: string[]) {
    this.warningMessages = messages;
    this.warningOpen = true;
    this.errorMessage = '';
  }
}
