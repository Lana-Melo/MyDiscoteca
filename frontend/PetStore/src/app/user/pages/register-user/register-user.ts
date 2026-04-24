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
  birthDate = '';
  favoriteArtist = '';
  showError = signal(false);
  errorMessage = signal('');

  cd = inject(ChangeDetectorRef);
  router = inject(Router);
  userService = inject(UserService);

  registerUser() {
    if (!this.username || !this.email || !this.password || !this.birthDate) {
      this.errorMessage.set('Please fill in all required fields.');
      this.showError.set(true);
      this.cd.markForCheck();
      return;
    }

    const payload: RegisterUserPayload = {
      username: this.username,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate,
      favoriteArtist: this.favoriteArtist || null,
    };

    this.userService.registerUser(payload).subscribe(() => {
      alert('User registered successfully!');
      this.router.navigate(['/login']);
    });
  }
}