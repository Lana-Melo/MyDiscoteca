// Interfaces que representam os dados de álbuns
// devolvidos pela API do backend.

export interface AlbumArtist {
  _id: string;
  isni: string;
  name: string;
  type: 'solo' | 'group';
  imageUrl?: string;
}

export interface AlbumSong {
  title: string;
  duration: number;
}

export interface AlbumTrack {
  _id: string;
  sequentialNumber: number;
  song: AlbumSong;
}

export interface AlbumVersion {
  _id: string;
  eanCode: string;
  designation: string;
}

export interface AlbumPhysicalSupport {
  _id: string;
  type: 'CD' | 'Vinyl' | 'Cassette';
  versions: AlbumVersion[];
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
  tracks?: AlbumTrack[];
  physicalSupports?: AlbumPhysicalSupport[];
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
