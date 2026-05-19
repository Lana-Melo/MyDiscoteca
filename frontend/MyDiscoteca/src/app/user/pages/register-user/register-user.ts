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
  //favoriteArtist = '';
  showError = signal(false);
  errorMessage = signal('');
  errorMessages = signal<string[]>([]);

  // signals para exibir erro direto nos campos
  usernameError = signal(''); // quando mudar o valor, template eh avisado
  emailError = signal('');
  passError = signal('');
  birthDateError = signal('');

  cd = inject(ChangeDetectorRef);
  router = inject(Router);
  userService = inject(UserService);

  registerUser() {
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const birthDate = this.normalizeBirthDate(this.birthDate);

    // limpar os campos com os erros de validacao
    this.usernameError.set('');
    this.emailError.set('');
    this.passError.set('');
    this.birthDateError.set('');

    const isFormValid = this.validateRegistrationFields(
      username,
      email,
      password,
      birthDate
    );

    if (!isFormValid) {
      this.errorMessage.set('Please fix the invalid account data.');
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
      //favoriteArtist: this.favoriteArtist || null,
    };

    this.userService.registerUser(payload).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          state: { successMessage: 'User registered successfully!' }
        });
      },
      error: (err) => { // erro no retorno do backend
        const errorMessages = this.extractErrorMessages(err);
        this.errorMessage.set(
          errorMessages.length > 0
            ? 'Please fix the invalid fields'
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

  // validação no frontend
  private validateRegistrationFields(
    username: string,
    email: string,
    password: string,
    birthDate: string
  ): boolean {
    let valid = true;

    if (!username) {
      this.usernameError.set('Username is required');
      valid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
      this.usernameError.set('Username can only contain letters and numbers.');
      valid = false;
    }

    if (!email) {
      this.emailError.set('Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.emailError.set('Email must be in a valid format (email@example.something).');
      valid = false;
    }

    if (!password) {
      this.passError.set('Password is required.');
      valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      this.passError.set('Password must have at least 8 characters, including uppercase, lowercase, and a number.');
      valid = false;
    }

    if (!birthDate) {
      this.birthDateError.set('Birth date is required.');
      valid = false;
    } else if (!this.isAtLeast13YearsOld(birthDate)) {
      this.birthDateError.set('User must be at least 13 years old.');
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

  private extractErrorMessages(err: any): string[] {
    if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
      return err.error.errors;
    }

    return err.error?.message ? [err.error.message] : [];
  }
}
