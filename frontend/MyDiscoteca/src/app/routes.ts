import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { Login } from './user/pages/login/login';
import { ArtistAlbums } from './artist/pages/artist-albums/artist-albums';
import { ArtistDetails } from './artist/pages/artist-details/artist-details';
import { ArtistAndAlbumSearch } from './search/artist-and-album-search/artist-and-album-search';
import { authGuard } from './auth.guard';
import { RegisterUser } from './user/pages/register-user/register-user';
import { UserCollection } from './user/pages/user-collection/user-collection';

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
    component: Dashboard,
    title: 'Dashboard',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterUser,
    title: 'Create Account',
  },
  {
    path: 'search',
    component: ArtistAndAlbumSearch,
    title: 'Search',
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
    path: 'user/collection',
    component: UserCollection,
    title: 'My Album Collection',
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
