import { Observable } from "rxjs";

// TODO(user-sprint-1): este ficheiro ainda descreve apenas o dominio antigo.
// Quando comecarem a migracao, vale a pena substitui-lo por tipos dedicados:
// User, RegisterUserPayload, LoginPayload, Artist, ArtistSearchResponse, etc.
export interface Category {
  _id?: string;
  name: string;
}

export interface Tag {
  _id?: string;
  name: string;
}

export interface PetInfo {
  _id?: string;
  name: string;
  photoUrls: string[];
  category?: Category;
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold';
  createdAt?: string;
  updatedAt?: string;
  __v?: number; 
}

export interface PetsApiResponse {
  message: string;
  pets: PetInfo[];
  success: boolean;
}

export interface PetApiResponse {
  message: string;
  pet: PetInfo;
  success: boolean;
}
