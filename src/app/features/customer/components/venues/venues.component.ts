import { Component } from '@angular/core';
import { VendorCardWrapComponent } from '../../../../shared/components/customer/vendor-card-wrap/vendor-card-wrap.component';
import { IVenue } from '../../../../core/models/venue.model';
import { AllVendorsService } from '../../services/vendors.service';
import { VenueCardComponent } from '../../../../shared/components/customer/venue-card/venue-card.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { venueService } from '../../services/venue.service';
import { VenueFiltersComponent } from '../../../../shared/components/customer/venue-filters/venue-filters.component';

@Component({
  selector: 'app-venues',
  standalone: true,
  imports: [
    VendorCardWrapComponent,
    VenueCardComponent,
    CommonModule,
    LoaderComponent,
    VenueFiltersComponent,
  ],
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.css',
})
export class VenuesComponent {
  venues!: IVenue[];
  searchItem: string = '';
  totalCount: number = 0;
  totalPages: number = 0;
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  filterData!: {
    services: string[];
    amenities: string[];
    venueTypes: string[];
    locations: string[];
  };

  selectedFilters!: {
    services: string[];
    amenities: string[];
    venueTypes: string[];
    location: string;
  };

  combinedFilters: { name: string, category: string }[] = [];

  constructor(
    private allvendorsservice: AllVendorsService,
    private venueService: venueService
  ) {}

  ngOnInit(): void {
    this.venueService.venuefilters$.subscribe((value) => {
      this.selectedFilters = value;
      this.loadVenues();
      this.updateCombinedFilters();
    });
  }

  onSelectedPagination(data: number) {
    this.page = data;
    this.loadVenues();
  }

  onSelectPageLimit(data: number) {
    this.limit = data;
    this.loadVenues();
  }

  loadVenues() {
    this.allvendorsservice
      .getAllVenuesPage(this.page, this.limit, this.selectedFilters, this.searchItem)
      .subscribe({
        next: (res) => {
          this.venues = res.data?.venues;
          this.totalCount = res.data?.totalCount;
          this.totalPages = res.data?.totalPages;
          this.filterData = res.data?.filterData;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err, 'error occured');
          this.isLoading = false;
        },
      });
  }

  updateCombinedFilters() {
    this.combinedFilters = [
      ...this.selectedFilters?.services?.map(item => ({ name: item, category: 'service' })),
      ...this.selectedFilters?.amenities?.map(item => ({ name: item, category: 'amenity' })),
      ...this.selectedFilters?.venueTypes?.map(item => ({ name: item, category: 'venueType' })),
      { name: this.selectedFilters.location, category: 'location' }
    ];
  }


  removeFilter(item: { name: string, category: string }) {
    switch (item.category) {
      case 'service':
        this.selectedFilters.services = this.selectedFilters.services.filter(service => service !== item.name);
        break;
      case 'amenity':
        this.selectedFilters.amenities = this.selectedFilters.amenities.filter(amenity => amenity !== item.name);
        break;
      case 'venueType':
        this.selectedFilters.venueTypes = this.selectedFilters.venueTypes.filter(venueType => venueType !== item.name);
        break;
      case 'location':
        this.selectedFilters.location = ''; // Clear the selected location
        break;
    }

    // Update the combinedFilters after removal
    this.updateCombinedFilters();
    this.venueService.updateFilters(this.selectedFilters);
  }

  onSearch(data: string){
    this.searchItem = data;
    this.loadVenues()
  }
}
