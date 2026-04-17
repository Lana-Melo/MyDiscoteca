import { Observable } from "rxjs";

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