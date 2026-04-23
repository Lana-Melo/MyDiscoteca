import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PorscheDesignSystemModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  isNavOpen = false;

  openNav() {
    this.isNavOpen = !this.isNavOpen;
    console.log("vou abrir o menu");  
  }

  goToArtists() {
    this.router.navigate(['/artists']);
  }

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      console.log('[RouterEvent]', event);
    });
  }
}