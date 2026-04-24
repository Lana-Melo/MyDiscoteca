import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserPayload } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, FormsModule, PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-button-pure icon="arrow-left" [routerLink]="['/login']">
          Back to login
        </p-button-pure>
      </div>
      <div class="col-wide">
        <p-heading>Register New User</p-heading>
      </div>
      <div class="col-wide grid grid-cols-subgrid">
        <div class="col-span-one-half">
          <p-input-text
            label="Username"
            [(ngModel)]="username"
            name="username">
          </p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-email
            label="Email"
            [(ngModel)]="email"
            name="email">
          </p-input-email>
        </div>
        <div class="col-span-one-half">
          <p-input-password
            label="Password"
            name="password"
            [(ngModel)]="password"
            [toggle]="true">
          </p-input-password>
        </div>
        <div class="col-span-one-half">
          <p-input-date
            label="Birth Date"
            [(ngModel)]="birthDate"
            name="birthDate">
          </p-input-date>
        </div>
        <div class="col-span-one-half">
          <p-input-text
            label="Favorite Artist (optional)"
            [(ngModel)]="favoriteArtist"
            name="favoriteArtist">
          </p-input-text>
        </div>
      </div>
      <div class="col-wide">
        <p-button type="button" (click)="registerUser()">
          Register User
        </p-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUser {
  username = '';
  email = '';
  password = '';
  birthDate = '';
  favoriteArtist = '';

  router = inject(Router);
  userService = inject(UserService);

  registerUser() {
    if (!this.username || !this.email || !this.password || !this.birthDate) {
      alert('Por favor preenche todos os campos obrigatórios.');
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