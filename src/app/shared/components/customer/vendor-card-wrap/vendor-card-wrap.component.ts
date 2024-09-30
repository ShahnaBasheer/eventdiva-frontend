import { Component, Input } from '@angular/core';
import { SubNavbarComponent } from '../sub-navbar/sub-navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { VendorPaginationComponent } from "../../vendors/vendor-pagination/vendor-pagination.component";

@Component({
  selector: 'app-vendor-card-wrap',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FiltersComponent,
    PaginationComponent,
    SubNavbarComponent,
    VendorPaginationComponent,
],
  templateUrl: './vendor-card-wrap.component.html',
  styleUrl: './vendor-card-wrap.component.css'
})

export class VendorCardWrapComponent {
   @Input({ required: true }) subHeading: string = '';
   @Input() totalCount: number = 0;
   @Input() totalPages: number = 1;
   @Input() filterData!: {
    services: string[],
    amenities: string[],
    locations: string[]
  };
}
