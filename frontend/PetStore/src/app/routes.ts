import {Routes} from '@angular/router';
import {Home} from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { RegisterPet } from './register-pet/register-pet';

const routeConfig: Routes = [
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