import {Routes} from '@angular/router';
import {Home} from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { RegisterPet } from './register-pet/register-pet';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { ArtistDetails } from './artist-details/artist-details';
import { ArtistSearch } from './artist/artist-search/artist-search';

const routeConfig: Routes = [
  // TODO(user-sprint-1): este array ainda representa a navegacao do pet store.
  // O proximo passo aqui e trocar/repensar estas rotas para refletirem o
  // projeto: registo, login, dashboard, perfil, editar perfil, pesquisa de
  // artistas e pagina de artista.
  {
    path: 'dashboard',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'artists',
    component: ArtistSearch,
    title: 'Artists'
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
  },
  {
    path: 'user/profile/:id',
    component: UserProfile,
    title: 'User Profile',
  },
  {
    path: 'user/profile/:id/edit',
    component: EditUserProfile,
    title: 'Edit User Profile',
  },
  {
    path: 'artist/details',
    component: ArtistDetails,
    title: 'Artist Details',
  },
];
export default routeConfig;
