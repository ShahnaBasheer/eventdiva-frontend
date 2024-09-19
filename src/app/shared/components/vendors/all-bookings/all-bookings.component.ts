import { Component, OnInit } from '@angular/core';
import { BookingsCardComponent } from '../bookings-card/bookings-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [ BookingsCardComponent, CommonModule ],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.css'
})


export class AllBookingsComponent{


}
