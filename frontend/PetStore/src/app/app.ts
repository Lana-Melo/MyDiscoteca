import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PorscheDesignSystemModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  isNavOpen = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  openNav() {
    this.isNavOpen = !this.isNavOpen;
    console.log("vou abrir o menu");  
  }

  goToArtists() {
    this.router.navigate(['/artists']);
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
