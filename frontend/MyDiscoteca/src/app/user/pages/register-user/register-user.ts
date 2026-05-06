import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserPayload } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, FormsModule, PorscheDesignSystemModule, RouterLink],
  templateUrl: './register-user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUser {
  username = '';
  email = '';
  password = '';
  birthDate: string | Date | null = '';
  favoriteArtist = '';
  showError = signal(false);
  errorMessage = signal('');
  errorMessages = signal<string[]>([]);

  cd = inject(ChangeDetectorRef);
  router = inject(Router);
  userService = inject(UserService);

  registerUser() {
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const birthDate = this.normalizeBirthDate(this.birthDate);

    const validationMessages = this.validateRegistrationFields(
      username,
      email,
      password,
      birthDate
    );

    if (validationMessages.length > 0) {
      this.errorMessage.set('Please fix the invalid account data.');
      this.errorMessages.set(validationMessages);
      this.showError.set(true);
      this.cd.markForCheck();
      return;
    }

    this.showError.set(false);
    this.errorMessage.set('');
    this.errorMessages.set([]);

    const payload: RegisterUserPayload = {
      username,
      email,
      password,
      birthDate,
      favoriteArtist: this.favoriteArtist || null,
    };

    this.userService.registerUser(payload).subscribe({
      next: () => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessages = this.extractErrorMessages(err);
        this.errorMessage.set(
          errorMessages.length > 0
            ? 'Please fix the invalid account data.'
            : err.error?.message || 'Unable to register user.'
        );
        this.errorMessages.set(errorMessages);
        this.showError.set(true);
        this.cd.markForCheck();
      }
    });
  }

  private normalizeBirthDate(value: string | Date | null): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value.trim();
    }

    return value.toISOString().slice(0, 10);
  }

  private validateRegistrationFields(
    username: string,
    email: string,
    password: string,
    birthDate: string
  ): string[] {
    const messages: string[] = [];

    if (!username) {
      messages.push('Username is required.');
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
      messages.push('Username can only contain letters and numbers.');
    }

    if (!email) {
      messages.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      messages.push('Email must be in a valid format (email@example.something).');
    }

    if (!password) {
      messages.push('Password is required.');
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      messages.push('Password must have at least 8 characters, including uppercase, lowercase, and a number.');
    }

    if (!birthDate) {
      messages.push('Birth date is required.');
    } else if (!this.isAtLeast13YearsOld(birthDate)) {
      messages.push('User must be at least 13 years old.');
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

  private extractErrorMessages(err: any): string[] {
    if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
      return err.error.errors;
    }

    return err.error?.message ? [err.error.message] : [];
  }
}
