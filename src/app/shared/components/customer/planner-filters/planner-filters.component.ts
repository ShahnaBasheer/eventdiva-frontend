import { Component, Input } from '@angular/core';
import { PlannerService } from '../../../../features/customer/services/planner.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planner-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner-filters.component.html',
  styleUrl: './planner-filters.component.css',
})
export class PlannerFiltersComponent {
  selectedLocation: string = '';
  selectedServices: boolean[] = [];

  @Input({ required: true }) filterData!: {
    services: string[];
    locations: string[];
  };
  isModalOpen = false;

  constructor(private plannerservice: PlannerService) {}

  ngOnInit() {
    this.plannerservice.plannerfilters$.subscribe((filters) => {
      this.selectedLocation = filters.location;
      this.selectedServices = filters.services;
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  applyFilters() {
    // Get selected services, amenities, and venue types based on checkboxes
    const services = this.filterData?.services?.filter((_, index) => this.selectedServices[index]);
    this.plannerservice.updateFilters({
      services,
      location: this.selectedLocation,
    });

    this.toggleModal(); // Close the modal after applying filters
  }
}
