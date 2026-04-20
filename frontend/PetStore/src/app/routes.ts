import {Routes} from '@angular/router';
import {Home} from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { RegisterPet } from './register-pet/register-pet';

const routeConfig: Routes = [
  // TODO(user-sprint-1): este array ainda representa a navegacao do pet store.
  // O proximo passo aqui e trocar/repensar estas rotas para refletirem o
  // projeto: registo, login, dashboard, perfil, editar perfil, pesquisa de
  // artistas e pagina de artista.
  {
    path: 'pets',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'pets/details/:id',
    component: PetDetails,
    title: 'Pet details',
  },
  {
    path: 'pets/new',
    component: RegisterPet,
    title: 'Register new pet',
  }
];
export default routeConfig;
