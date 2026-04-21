import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, PorscheDesignSystemModule],
  template: `
    <main>
      <!-- TODO(user-sprint-1): este cabecalho ainda aponta para a home do pet
      store. Quando fizerem login/dashboard, aqui deve nascer a shell principal
      da app, com links para dashboard, perfil e pesquisa de artistas. -->
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
  // TODO(user-sprint-1): a app raiz ainda nao conhece estado de autenticacao.
  // Mais tarde, este componente pode passar a decidir que links mostrar quando
  // houver sessao iniciada.
  title = 'homes';
}
