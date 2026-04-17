import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <a [routerLink]="['/pets']">
        <header class="brand-name">
          <h1>Pet Store</h1>
        </header>
      </a>
      <section class="content">
        <router-outlet />
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'homes';
}