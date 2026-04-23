export interface FavoriteArtist {
  _id?: string;
  id?: string;
  isni: string;
  name: string;
  yearStarted: number;
  type: 'solo' | 'group';
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  birthDate: string;
  favoriteArtist?: FavoriteArtist | string | null;
  albumLists: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserApiResponse {
  message: string;
  user: UserInfo;
  success: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserInfo;
  success: boolean;
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
  birthDate: string;
  favoriteArtist?: string | null;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  birthDate?: string;
  favoriteArtist?: string | null;
  currentPassword: string;
  password?: string;
}
