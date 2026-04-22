import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { UserInfo } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'user-details',
  imports: [PorscheDesignSystemModule, RouterLink],
  template: `
    <div class="grid-template">
      <div class="col-wide">
        <p-heading>Hello, {{ user?.username || 'User' }}</p-heading>
      </div>

      @if (isLoading) {
        <div class="col-wide">
          <p-text>Loading user profile...</p-text>
        </div>
      } @else if (errorMessage) {
        <div class="col-wide">
          <p-text color="notification-error">{{ errorMessage }}</p-text>
        </div>
      } @else if (user) {
        <div class="col-wide grid grid-cols-subgrid">
        <div class="col-span-one-half">
          <p-input-text label="Username" [value]="user.username" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Email" [value]="user.email" [disabled]="true"></p-input-text>
        </div>
        <div class="col-span-one-half">
          <p-input-date label="Birth Date" [value]="birthDateValue" [disabled]="true"></p-input-date>
        </div>
        <div class="col-span-one-half">
          <p-input-text label="Favorite Artist" [value]="favoriteArtistName" [disabled]="true"></p-input-text>
          @if (favoriteArtistId) {
            <a [routerLink]="['/artists/details', favoriteArtistId]">
              <p-button-pure>
                Go to artist profile
              </p-button-pure>
            </a>
          }
        </div>
        <div class="col-span-one-half">
          <p-button>
            Edit profile
          </p-button>
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class UserDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  user: UserInfo | undefined;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    if (userId) {
      this.loadUserById(userId);
      return;
    }

    this.loadFirstUserForDevelopment();
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

  private loadUserById(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load user profile.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private loadFirstUserForDevelopment(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.user = users[0];
        this.isLoading = false;

        if (!this.user) {
          this.errorMessage = 'No users found yet. Create a user first.';
        }

        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load user profile.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
