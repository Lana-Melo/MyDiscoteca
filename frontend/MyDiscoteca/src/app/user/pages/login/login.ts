import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, PorscheDesignSystemModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
  })
export class Login {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.successMessage =
      this.router.getCurrentNavigation()?.extras.state?.['successMessage'] ||
      history.state?.successMessage ||
      '';
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Invalid username or password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
