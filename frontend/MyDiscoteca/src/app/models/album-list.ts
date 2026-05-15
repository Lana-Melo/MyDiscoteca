import { AlbumInfo } from './album';

export interface AlbumListItem {
  _id?: string;
  album: AlbumInfo | string;
  addedAt: string;
}

export interface AlbumList {
  _id: string;
  id?: string;
  name: string;
  user: string;
  albums: AlbumListItem[];
  albumCount: number;
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AlbumListsApiResponse {
  success: boolean;
  message: string;
  albumLists: AlbumList[];
}

export interface AlbumListApiResponse {
  success: boolean;
  message: string;
  albumList: AlbumList;
}
