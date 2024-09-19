import { Component, Input } from '@angular/core';
import { SubNavbarComponent } from '../sub-navbar/sub-navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-vendor-card-wrap',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FiltersComponent,
    PaginationComponent,
    SubNavbarComponent
],
  templateUrl: './vendor-card-wrap.component.html',
  styleUrl: './vendor-card-wrap.component.css'
})

export class VendorCardWrapComponent {
  @Input({ required: true }) subHeading: string = '';
}
