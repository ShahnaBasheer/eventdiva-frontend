import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venue-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './venue-filters.component.html',
  styleUrl: './venue-filters.component.css'
})


export class VenueFiltersComponent {
  selectedLocation: string[] = [];
  @Input({ required: true}) filterData!: {
    services: string[],
    amenities: string[],
    locations: string[]
  }

  rentPriceRanges = [
    { label: '0 - 10,000', selected: false },
    { label: '10,001 - 30,000', selected: false },
    { label: '30,001 - 50,000', selected: false },
    { label: '50,001 - 100,000', selected: false },
    { label: '100,001 - 200,000', selected: false },
    { label: '200,001 - 300,000', selected: false },
    { label: 'Above 300,000', selected: false },
  ];

  isModalOpen = false;


  // Output to emit selected filter values
  @Output() filtersApplied = new EventEmitter<{
    selectedMonth: number | null;
    selectedYear: number | null;
    selectedEventType: string | null;
    selectedDays: string | null;
  }>();

  // Track selected values
  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  selectedEventType: string | null = null;
  selectedDays: string | null = null;



  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  applyFilters() {
    // Emit selected filter values when applying filters
    this.filtersApplied.emit({
      selectedMonth: this.selectedMonth,
      selectedYear: this.selectedYear,
      selectedEventType: this.selectedEventType,
      selectedDays: this.selectedDays
    });
    this.toggleModal(); // Close the modal after applying filters
  }

}
