import { ArtistInfo } from './artist';

export interface Version {
  _id: string;
  eanCode: string;
  designation: string;
  physicalSupport: PhysicalSupport | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PhysicalSupport {
  _id: string;
  type: 'CD' | 'Vinyl' | 'Cassette';
  album: Album | string;
  versions: Version[] | string[];
}

export interface Album {
  _id: string;
  mbdi: string;
  title: string;
  imageUrl?: string;
  releaseYear: number;
  type: 'single' | 'EP' | 'LP';
  artist?: ArtistInfo | string;
}

export interface AlbumCollection {
  _id: string;
  user: string;
  versions: Version[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AlbumCollectionApiResponse {
  success: boolean;
  message: string;
  collection: AlbumCollection;
}
