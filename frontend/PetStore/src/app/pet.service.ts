import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetApiResponse, PetInfo, PetsApiResponse } from './pet';

@Injectable({
  providedIn: 'root',
})

// TODO(user-sprint-1): este service e um bom exemplo da estrutura que a app ja
// usa, mas o dominio esta errado. Em vez de um unico PetService, o projeto vai
// ficar mais claro se separarem em AuthService, UserService e ArtistService.
export class PetService {
  url = '/api/pets';

  // Injecta o HttpClient no HousingService
  http = inject(HttpClient);

  // Cabeçalhos a incluir no pedido http.PUT
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllPets(): Observable<PetInfo[]> {
    // TODO(user-sprint-1): este metodo pode ser reaproveitado como base para a
    // pesquisa/listagem de artistas, trocando o endpoint e os tipos.
    return this.http.get<PetsApiResponse>(`${this.url}/`)
    .pipe(map(response => response.pets)); // isso é necessário pq a lista de pets vem wrapped num objeto com outras propriedades (message, success)
  }

  getPetById(id: number): Observable<PetInfo> {
    // TODO(user-sprint-1): este padrao tambem encaixa bem na futura pagina de
    // detalhe do artista (GET /api/artists/:id).
    return this.http.get<PetApiResponse>(`${this.url}/${id}`)
    .pipe(map(response => response.pet));
  }

  registerPet(petInfo: PetInfo): Observable<PetInfo> {
    // TODO(user-sprint-1): substituir por registo de utilizador. Aqui vao entrar
    // username, email, password e birthDate, com validacoes coerentes com o
    // enunciado.
    return this.http.post<PetApiResponse>(`${this.url}/`, petInfo, this.httpOptions)
      .pipe(map(response => response.pet));
  }
}
