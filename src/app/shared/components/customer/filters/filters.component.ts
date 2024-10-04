import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VenueFiltersComponent } from "../venue-filters/venue-filters.component";
import { CommonModule } from '@angular/common';
import { venueService } from '../../../../features/customer/services/venue.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule, VenueFiltersComponent, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})

export class FiltersComponent {
  limit = 10;
  @Input({required: true}) totalCount: number = 0;
  filters!: {
    services: string[],
    amenities: string[],
    venueTypes: string[],
    location: string
  };

  combinedFilters: { name: string, category: string }[] = [];
  @Output() limitEventEmitter = new EventEmitter<number>();
  @Output() appliedEmitter = new EventEmitter<boolean>();

  constructor(private venueService: venueService){}

  ngOnInit(){
    this.venueService.venuefilters$.subscribe(value => {
        this.filters = value;
        this.updateCombinedFilters();
    })
  }

  onSelectPageSize(value: number){
    this.limitEventEmitter.emit(value);
  }


  // Update the combined filters to include category info
  updateCombinedFilters() {
    this.combinedFilters = [
      ...this.filters.services.map(item => ({ name: item, category: 'service' })),
      ...this.filters.amenities.map(item => ({ name: item, category: 'amenity' })),
      ...this.filters.venueTypes.map(item => ({ name: item, category: 'venueType' })),
      { name: this.filters.location, category: 'location' }
    ];
    console.log(this.combinedFilters)
  }

   // Method to remove the selected item
   removeFilter(item: { name: string, category: string }) {
    switch (item.category) {
      case 'service':
        this.filters.services = this.filters.services.filter(service => service !== item.name);
        break;
      case 'amenity':
        this.filters.amenities = this.filters.amenities.filter(amenity => amenity !== item.name);
        break;
      case 'venueType':
        this.filters.venueTypes = this.filters.venueTypes.filter(venueType => venueType !== item.name);
        break;
      case 'location':
        this.filters.location = ''; // Clear the selected location
        break;
    }

    // Update the combinedFilters after removal
    this.updateCombinedFilters();
    this.venueService.updateFilters(this.filters);
    this.appliedEmitter.emit();
  }

  onFiltersApplied(selectedFilters: any) {
    this.venueService.updateFilters(selectedFilters);
    this.filters = selectedFilters;
    this.appliedEmitter.emit();
  }
}
