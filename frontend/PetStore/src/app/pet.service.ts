import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetApiResponse, PetInfo, PetsApiResponse } from './pet';

@Injectable({
  providedIn: 'root',
})

export class PetService {
  url = '/api/pets';

  // Injecta o HttpClient no HousingService
  http = inject(HttpClient);

  // Cabeçalhos a incluir no pedido http.PUT
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllPets(): Observable<PetInfo[]> {
    return this.http.get<PetsApiResponse>(`${this.url}/`)
    .pipe(map(response => response.pets)); // isso é necessário pq a lista de pets vem wrapped num objeto com outras propriedades (message, success)
  }

  getPetById(id: number): Observable<PetInfo> {
    return this.http.get<PetApiResponse>(`${this.url}/${id}`)
    .pipe(map(response => response.pet));
  }

  registerPet(petInfo: PetInfo): Observable<PetInfo> {
    return this.http.post<PetApiResponse>(`${this.url}/`, petInfo, this.httpOptions)
      .pipe(map(response => response.pet));
  }
}
