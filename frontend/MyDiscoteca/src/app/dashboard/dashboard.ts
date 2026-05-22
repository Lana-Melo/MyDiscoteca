import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { FavoriteArtist, UserInfo } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './dashboard.html',
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    .dashboard-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.875rem;
      padding: 1.75rem 1.25rem;
      border-radius: 1rem;
      border: 1px solid var(--shadow-color);
      text-decoration: none;
      color: inherit;
      background: white;
      transition: box-shadow 0.2s, border-color 0.2s;
      cursor: pointer;
    }
    .dashboard-card:hover {
      box-shadow: 0 4px 16px rgba(96, 93, 200, 0.15);
      border-color: var(--secondary-color);
    }
    .card-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon-circle {
      background-color: var(--accent-color);
      color: var(--primary-color);
    }
    .artist-circle {
      overflow: hidden;
    }
    .artist-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card-label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  `],
})
export class Dashboard implements OnInit {
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

  get username(): string {
    return this.user?.username || '';
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
