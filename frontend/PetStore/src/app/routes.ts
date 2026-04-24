import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { Login } from './user/pages/login/login';
import { ArtistAlbums } from './artist/artist-albums/artist-albums';
import { ArtistDetails } from './artist/artist-details/artist-details';
import { ArtistSearch } from './artist/artist-search/artist-search';
import { authGuard } from './auth.guard';
import { RegisterUser } from './user/pages/register-user/register-user';

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
    path: 'artist/details/:id/albums',
    component: ArtistAlbums,
    title: 'Artist Albums',
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

export default routeConfig;
