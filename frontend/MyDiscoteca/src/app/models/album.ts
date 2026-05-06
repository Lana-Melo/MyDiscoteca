// Interfaces que representam os dados de álbuns
// devolvidos pela API do backend.

export interface AlbumArtist {
  _id: string;
  isni: string;
  name: string;
  type: 'solo' | 'group';
  imageUrl?: string;
}

export interface AlbumInfo {
  _id?: string;
  id?: string;
  mbdi: string;
  title: string;
  imageUrl?: string;
  releaseYear: number;
  type: 'single' | 'EP' | 'LP';
  artist?: AlbumArtist;
}

export interface AlbumsApiResponse {
  success: boolean;
  message: string;
  albums: AlbumInfo[];
}

export interface AlbumApiResponse {
  success: boolean;
  message: string;
  album: AlbumInfo;
}
