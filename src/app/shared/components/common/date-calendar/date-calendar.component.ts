import { Component, Input } from '@angular/core';
import { CustomDatePipe } from '../../../../core/pipes/cutom-date.pipe';


@Component({
  selector: 'app-date-calendar',
  standalone: true,
  imports: [ CustomDatePipe ],
  templateUrl: './date-calendar.component.html',
  styleUrl: './date-calendar.component.css'
})


export class DateCalendarComponent {
  @Input({required: true}) eventDate!: Date;


}

