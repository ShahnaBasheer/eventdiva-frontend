import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomDatePipe } from '../../../../core/pipes/cutom-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueBooking } from '../../../../core/models/venueBooking.model';
import { DateCalendarComponent } from '../../common/date-calendar/date-calendar.component';
import { PlannerBooking } from '../../../../core/models/plannerBooking.model';

@Component({
  selector: 'app-bookings-card',
  standalone: true,
  imports: [ CommonModule, CustomDatePipe, DateCalendarComponent],
  templateUrl: './bookings-card.component.html',
  styleUrl: './bookings-card.component.css'
})


export class BookingsCardComponent {
  @Input({required: true}) item!: VenueBooking | PlannerBooking;

  constructor(private router: Router, private route: ActivatedRoute){}

  onViewDetails(){
     this.router.navigate(['details', this.item.bookingId], {relativeTo: this.route})
  }
}
