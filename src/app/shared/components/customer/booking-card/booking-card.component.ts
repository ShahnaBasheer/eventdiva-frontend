import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { IVenue } from '../../../../core/models/venue.model';
import { checkVenue } from '../../../../core/helpers/helper.function';
import { VenueBooking } from '../../../../core/models/venueBooking.model';
import { PlannerBooking } from '../../../../core/models/plannerBooking.model';
import { Store } from '@ngrx/store';
import { PlannerService } from '../../../../features/customer/services/planner.service';
import { venueService } from '../../../../features/customer/services/venue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})


export class BookingCardComponent{
  // isVenueType = false;
  // isPlannerType = false;
  @Input({ required: true }) item: VenueBooking | PlannerBooking |   null = null ;


  constructor(private router: Router){}


  isVenueBookingtype(item: PlannerBooking | VenueBooking | null): item is VenueBooking{
      return (item as VenueBooking)?.venueId !== undefined;
  }


  isPlannerBookingtype(item: PlannerBooking | VenueBooking | null): item is PlannerBooking{
    return (item as PlannerBooking)?.eventPlannerId !== undefined;
  }


  onSelectCard(){
      console.log(this.isPlannerBookingtype(this.item), this.isVenueBookingtype(this.item))
      if(this.isPlannerBookingtype(this.item)){
          this.router.navigate([`bookings/event-planner/details/${this.item?.bookingId}`])
      } else if(this.isVenueBookingtype(this.item)){
          this.router.navigate([`bookings/venue/details/${this.item?.bookingId}`])
      }
  }


}
