import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { venueService } from '../../../../features/customer/services/venue.service';

@Component({
  selector: 'app-venue-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent],
  templateUrl: './venue-filters.component.html',
  styleUrl: './venue-filters.component.css'
})


export class VenueFiltersComponent {
  selectedLocation: string = '';
  selectedServices: boolean[] = [];
  selectedAmenities: boolean[] = [];
  selectedVenueTypes: boolean[] = [];
  @Input({ required: true }) filterData!: {
    services: string[],
    amenities: string[],
    locations: string[],
    venueTypes: string[]
  }
  isModalOpen = false;

  constructor(private venueService: venueService){}

  ngOnInit(){
    this.venueService.venuefilters$.subscribe(filters => {
        this.selectedLocation = filters.location;
        this.selectedServices = filters.services;
        this.selectedAmenities = filters.amenities;
        this.selectedVenueTypes =filters.venueTypes;
    })
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  applyFilters() {
    // Get selected services, amenities, and venue types based on checkboxes
    const services = this.filterData?.services?.filter((_, index) => this.selectedServices[index]);
    const amenities = this.filterData?.amenities?.filter((_, index) => this.selectedAmenities[index]);
    const venueTypes = this.filterData?.venueTypes?.filter((_, index) => this.selectedVenueTypes[index]);
    this.venueService.updateFilters({
      services,
      amenities,
      venueTypes,
      location: this.selectedLocation
    });

    this.toggleModal(); // Close the modal after applying filters
  }

}



