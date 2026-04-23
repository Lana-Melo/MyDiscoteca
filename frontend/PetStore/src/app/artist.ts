// Interfaces que representam os dados de artistas
// devolvidos pela API do backend.

export interface ArtistMember {
  _id: string;
  isni: string;
  name: string;
  yearStarted: number;
  type: 'solo' | 'group';
}

export interface ArtistAlbum {
  _id: string;
  mbdi: string;
  title: string;
  releaseYear: number;
  type: string;
}

export interface ArtistInfo {
  _id?: string;
  id?: string;
  isni: string;
  name: string;
  yearStarted: number;
  type: 'solo' | 'group';
  members?: ArtistMember[];
  albums?: ArtistAlbum[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ArtistsApiResponse {
  success: boolean;
  message: string;
  artists: ArtistInfo[];
}

export interface ArtistApiResponse {
  success: boolean;
  message: string;
  artist: ArtistInfo;
}
