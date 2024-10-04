import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubNavbarComponent } from '../sub-navbar/sub-navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { VendorPaginationComponent } from '../../vendors/vendor-pagination/vendor-pagination.component';
import { VenueFiltersComponent } from '../venue-filters/venue-filters.component';
import { FormsModule } from '@angular/forms';
import { venueService } from '../../../../features/customer/services/venue.service';

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
    VenueFiltersComponent,
    FormsModule,
  ],
  templateUrl: './vendor-card-wrap.component.html',
  styleUrl: './vendor-card-wrap.component.css',
})
export class VendorCardWrapComponent {
  limit: number = 10;
  @Input({ required: true }) subHeading: string = '';
  @Input({ required: true }) search: string = '';
  @Input({ required: true }) totalCount: number = 0;
  @Input({ required: true }) totalPages: number = 1;

  selectedfilters: {
    services: string[];
    amenities: string[];
    location: string;
    venueTypes: string[];
  } = {
    services: [],
    amenities: [],
    location: '', // Default empty string
    venueTypes: [],
  };

  @Output() selectedPageEmitter = new EventEmitter<number>();
  @Output() selectedPageLimitEmitter = new EventEmitter<number>();
  @Output() searchEmitter = new EventEmitter<string>();

  constructor(private venueService: venueService) {}

  onSelectedPage(data: number) {
    this.selectedPageEmitter.emit(data);
  }

  onSelectedPageLimit(data: number) {
    this.selectedPageLimitEmitter.emit(data);
  }

  onFiltersApplied(selectedFilters: any) {
    this.venueService.updateFilters(selectedFilters);
    this.selectedfilters = selectedFilters;
  }

  onSearch(data: string){
      this.searchEmitter.emit(data)
  }
}
