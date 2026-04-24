import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { RegisterPet } from './register-pet/register-pet';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { Login } from './user/pages/login/login';
import { ArtistDetails } from './artist-details/artist-details';
import { ArtistSearch } from './artist/artist-search/artist-search';

const routeConfig: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'register',
    component: RegisterPet,
    title: 'Create Account',
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
    path: 'artist/details/:id',
    component: ArtistDetails,
    title: 'Artist Details',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

export default routeConfig;
