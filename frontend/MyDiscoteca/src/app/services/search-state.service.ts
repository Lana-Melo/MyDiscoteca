import { Injectable } from '@angular/core';
import { ArtistInfo } from '../models/artist';
import { AlbumInfo } from '../models/album';

export type SearchMode = 'artist' | 'album';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  searchMode: SearchMode = 'artist';
  searchQuery: string = '';
  artistResults: ArtistInfo[] = [];
  albumResults: AlbumInfo[] = [];

  // Used to track if we have already performed an initial load
  hasData = false;

  constructor() { }

  saveState(mode: SearchMode, query: string, artists: ArtistInfo[], albums: AlbumInfo[]): void {
    this.searchMode = mode;
    this.searchQuery = query;
    this.artistResults = artists;
    this.albumResults = albums;
    this.hasData = true;
  }

  clearState(): void {
    this.searchMode = 'artist';
    this.searchQuery = '';
    this.artistResults = [];
    this.albumResults = [];
    this.hasData = false;
  }
}
