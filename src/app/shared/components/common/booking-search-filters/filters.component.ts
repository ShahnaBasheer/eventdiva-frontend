import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-search-filters',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})


export class BookingSearchFiltersComponent {
  isModalOpen = false;
  @Input({required: true}) allfilters!: {
    months: number[], years: number[], eventTypes: string[]
  };

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
