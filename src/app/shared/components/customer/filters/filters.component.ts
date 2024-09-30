import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VenueFiltersComponent } from "../venue-filters/venue-filters.component";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule, VenueFiltersComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})

export class FiltersComponent {
  limit = 10;
  @Input({ required: true }) allfilters!: {
    services: string[],
    amenities: string[],
    locations: string[]
  };

  @Output() limitEventEmitter = new EventEmitter<number>;


  onSelectPageSize(value: number){
    this.limitEventEmitter.emit(value)
  }
}
