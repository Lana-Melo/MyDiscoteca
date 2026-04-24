import { ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { UserService } from '../../../services/user.service';
import { UserInfo } from '../../../models/user';

@Component({
  selector: 'user-profile',
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './user-profile.html',
  styles: ``,
})
export class UserProfile implements OnInit {
  private readonly userService = inject(UserService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  user: UserInfo | undefined;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCurrentUserProfile();
  }

  get birthDateValue(): string {
    if (!this.user?.birthDate) {
      return '';
    }

    return this.user.birthDate.slice(0, 10);
  }

  get favoriteArtistName(): string {
    const favoriteArtist = this.user?.favoriteArtist;

    if (!favoriteArtist) {
      return 'No favorite artist selected';
    }

    if (typeof favoriteArtist === 'string') {
      return favoriteArtist;
    }

    return favoriteArtist.name;
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

  private loadCurrentUserProfile(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load current user profile. Set currentUserId in localStorage until login is implemented.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
