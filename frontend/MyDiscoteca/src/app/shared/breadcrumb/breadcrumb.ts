import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [PorscheDesignSystemModule, RouterLink],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  @Input() items: BreadcrumbItem[] = [];
}
