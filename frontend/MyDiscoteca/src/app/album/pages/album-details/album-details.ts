import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumInfo } from '../../../models/album';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'album-details',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './album-details.html',
  styles: `
    .album-image {
      width: 100%;
      max-width: 24rem;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 1rem;
      display: block;
    }
  `,
})
export class AlbumDetails implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  albumService: AlbumService = inject(AlbumService);

  album: AlbumInfo | undefined;
  openAccordions: Record<string, boolean> = {};

  ngOnInit(): void {
    const albumId = this.route.snapshot.params['id'];
    this.albumService.getAlbumById(albumId).subscribe((album) => {
      this.album = album;
      this.changeDetectorRef.markForCheck();
    });
  }
  
  formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec.toString().padStart(2, '0')} sec`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    img.src = '/api/media/placeholders/album.svg';
  }

  onAccordionUpdate(id: string, event: CustomEvent<{ open: boolean }>): void {
    this.openAccordions[id] = event.detail.open;
    this.changeDetectorRef.markForCheck();
  }

  addToCollection(versionId: string): void {
    console.log('adicionou à colecao', versionId);
  }

  requestNewVersion(): void {
    console.log('pediu para fazer request de nova version');
  }
}
