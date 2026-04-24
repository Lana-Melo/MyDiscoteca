import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PetDetails } from './pet-details/pet-details';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { Login } from './user/pages/login/login';
import { ArtistDetails } from './artist-details/artist-details';
import { ArtistSearch } from './artist/artist-search/artist-search';
import { RegisterUser } from './register-user/register-user';
import { authGuard } from './auth.guard';

const routeConfig: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'dashboard',
    component: Home,
    title: 'Home page',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterUser,
    title: 'Create Account',
  },
  {
    path: 'artists',
    component: ArtistSearch,
    title: 'Artists',
    canActivate: [authGuard],
  },
  {
    path: 'pets/details/:id',
    component: PetDetails,
    title: 'Pet details',
    canActivate: [authGuard],
  },
  {
    path: 'user/profile',
    component: UserProfile,
    title: 'User Profile',
    canActivate: [authGuard],
  },
  {
    path: 'user/profile/edit',
    component: EditUserProfile,
    title: 'Edit User Profile',
    canActivate: [authGuard],
  },
  {
    path: 'artist/details/:id',
    component: ArtistDetails,
    title: 'Artist Details',
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

export default routeConfig;
