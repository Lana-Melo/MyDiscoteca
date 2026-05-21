import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { UserProfile } from './user/pages/user-profile/user-profile';
import { EditUserProfile } from './user/pages/edit-user-profile/edit-user-profile';
import { Login } from './user/pages/login/login';
import { ArtistAlbums } from './artist/pages/artist-albums/artist-albums';
import { ArtistDetails } from './artist/pages/artist-details/artist-details';
import { AlbumDetails } from './album/pages/album-details/album-details';
import { ArtistAndAlbumSearch } from './search/artist-and-album-search/artist-and-album-search';
import { authGuard } from './auth.guard';
import { RegisterUser } from './user/pages/register-user/register-user';
import { NewAlbumVersionRequest } from './contribution/new-album-request/new-album-request';
import { MyRequests } from './contribution/my-requests/my-requests';
import { MyNotifications } from './contribution/my-notifications/my-notifications';
import { UserCollection } from './user/pages/user-collection/user-collection';
import { MyAlbumLists } from './album-list/pages/my-album-lists/my-album-lists';
import { AlbumListDetail } from './album-list/pages/album-list-details/album-list-details'

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
    path: 'contributions/album-version/new',
    component: NewAlbumVersionRequest,
    title: 'Contributte with a New Album Version',
    canActivate: [authGuard],
  },
  {
    path: 'contributions/album-version/my-requests',
    component: MyRequests,
    title: 'My Requests',
    canActivate: [authGuard],
  },
  {
    path: 'contributions/notifications',
    component: MyNotifications,
    title: 'Notifications',
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
    path: 'album/details/:id',
    component: AlbumDetails,
    title: 'Album Details',
    canActivate: [authGuard],
  },
  {
    path: 'user/collection',
    component: UserCollection,
    title: 'My Album Collection',
    canActivate: [authGuard],
  },
  {
    path: 'album-lists',
    component: MyAlbumLists,
    title: 'My Album Lists',
    canActivate: [authGuard],
  },
  {
    path: 'album-lists/:listId',
    component: AlbumListDetail,
    title: 'Album List',
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
