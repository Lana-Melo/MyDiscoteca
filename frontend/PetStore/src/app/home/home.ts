import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ArtistCard } from '../artist/artist-card/artist-card';
import { FavoriteArtist, UserInfo } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [PorscheDesignSystemModule, ArtistCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userService = inject(UserService);

  user: UserInfo | undefined;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load dashboard.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  get favoriteArtist(): FavoriteArtist | null {
    const favoriteArtist = this.user?.favoriteArtist;

    if (!favoriteArtist || typeof favoriteArtist === 'string') {
      return null;
    }

    return favoriteArtist;
  }

  get favoriteArtistId(): string | null {
    const favoriteArtist = this.user?.favoriteArtist;

    if (!favoriteArtist) {
      return null;
    }

    if (typeof favoriteArtist === 'string') {
      return favoriteArtist;
    }

    return favoriteArtist.id || favoriteArtist._id || null;
  }

  get favoriteArtistName(): string {
    const favoriteArtist = this.user?.favoriteArtist;

    if (!favoriteArtist) {
      return '';
    }

    if (typeof favoriteArtist === 'string') {
      return favoriteArtist;
    }

    return favoriteArtist.name;
  }

  get favoriteArtistYearStarted(): string {
    return this.favoriteArtist?.yearStarted?.toString() || '';
  }

  get favoriteArtistImage(): string {
    return this.favoriteArtist?.imageUrl || '/api/media/placeholders/artist.svg';
  }
}
