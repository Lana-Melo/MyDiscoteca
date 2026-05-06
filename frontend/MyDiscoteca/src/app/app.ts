import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet, RouterLink, Router } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { UserService } from './services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PorscheDesignSystemModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  isNavOpen = false;
  showProfilePopover = true;
  currentUsername = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isLoggedIn) {
          this.loadCurrentUser();
        } else {
          this.currentUsername = '';
        }
      });
  }

  openNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  goToArtists() {
    this.isNavOpen = false;
    this.router.navigate(['/artists']);
  }

  goToProfile() {
    this.closeProfileMenu();
    this.isNavOpen = false;
    this.router.navigate(['/user/profile']);
  }

  get currentUserFirstName() {
    return this.currentUsername.trim().split(/\s+/)[0];
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.closeProfileMenu();
    this.isNavOpen = false;
    this.currentUsername = '';
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  private closeProfileMenu() {
    this.showProfilePopover = false;
    setTimeout(() => {
      this.showProfilePopover = true;
    });
  }

  private loadCurrentUser() {
    if (!this.isLoggedIn) {
      return;
    }

    this.userService.getMe().subscribe({
      next: (user) => {
        this.currentUsername = user.username;
      },
      error: () => {
        this.currentUsername = '';
      }
    });
  }
}
