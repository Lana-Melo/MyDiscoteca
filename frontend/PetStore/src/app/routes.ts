import {Routes} from '@angular/router';
import {Home} from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { RegisterPet } from './register-pet/register-pet';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { ArtistDetails } from './artist-details/artist-details';

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
  },
  {
    path: 'user/profile',
    component: UserProfile,
    title: 'User Profile',
  },
  {
    path: 'user/profile/edit',
    component: EditUserProfile,
    title: 'Edit User Profile',
  },
  {
    path: 'artist/details',
    component: ArtistDetails,
    title: 'Artist Details',
  }
];
export default routeConfig;