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

  cd = inject(ChangeDetectorRef);
  router = inject(Router);
  userService = inject(UserService);

  registerUser() {
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const birthDate = this.normalizeBirthDate(this.birthDate);

    if (!username || !email || !password || !birthDate) {
      this.errorMessage.set('Username, email, password and birth date are required.');
      this.showError.set(true);
      this.cd.markForCheck();
      return;
    }

    this.showError.set(false);
    this.errorMessage.set('');

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
        this.errorMessage.set(err.error?.message || 'Unable to register user.');
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
}
