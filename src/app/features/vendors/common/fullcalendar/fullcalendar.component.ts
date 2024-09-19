import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { VenueVendorService } from '../../venue-vendor/services/venue-vendor.service';
import { TruncatePipe } from '../../../../core/pipes/truncate.pipe';
import { EventPlannerService } from '../../event-planners/services/event-planner.service';
import { Vendor } from '../../../../core/models/vendor.model';
import { Store } from '@ngrx/store';
import { getUser } from '../../store/vendor.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';


@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [ FullCalendarModule, CommonModule, TruncatePipe, ReactiveFormsModule ],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.css',
})


export class FullcalendarComponent implements OnInit{
  date!: Date; // Placeholder if you decide to use PrimeNG Calendar
  showModal = false;
  selectedEvent: any = null;
  showAddEvent = false;
  events: {title: string, date: string, classNames: string [] }[] = [];
  holidays: string[] = [];
  user: string = '';
  eventForm!: FormGroup;

  calendarOptions!: CalendarOptions;

  constructor(private venuvendorservice: VenueVendorService,
      private eventplannerservice: EventPlannerService,
      private store: Store,
      private fb: FormBuilder){}


  ngOnInit(): void {
      this.eventForm = this.fb.group({
        eventTitle: ['', [Validators.required, Validators.min(3)]],
        customerName: ['', [Validators.required, Validators.min(3)]],
        place: ['', [Validators.required, Validators.min(3)]],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      });

      this.store.select(getUser).subscribe(user => {
          if(user){
            this.user = user.vendorType || '';
            console.log(this.user)
          }
      })


      if(this.user === 'event-planner'){
        this.eventplannerservice.getAvailabilityInfo().subscribe({
          next: (res) => {
              const data = res.data.availabilityData;
              if(data){
                data.bookedDates.forEach((dateObj: any) => {
                  dateObj.slots.forEach((slot: any) => {
                      this.events.push({
                          title: slot.bookingId.eventType,  // Access the event name
                          date: dateObj.date,  // Use the booked date
                          classNames: ['event-1'],  // Add class name
                      });
                  });
                });

                this.holidays = data.holyDays.map((day: string) => new Date(day).toLocaleDateString('en-CA'));
                this.initializeCalendarOptions();
                console.log(this.holidays)
              }
          },
          error: (err) => {
              console.log(err.message, "jjjjjj");
          }
        })
      } else if(this.user === 'venue-vendor'){
        this.venuvendorservice.getAvailabilityInfo().subscribe({
          next: (res) => {
              const data = res.data.availabilityData;
              if(data){
                data.bookedDates.forEach((dateObj: any) => {
                  dateObj.slots.forEach((slot: any) => {
                      this.events.push({
                          title: slot.bookingId.eventType,  // Access the event name
                          date: dateObj.date,  // Use the booked date
                          classNames: ['event-1'],  // Add class name
                      });
                  });
                });
                this.holidays = data.holyDays.map((day: string) => new Date(day).toLocaleDateString('en-CA'));
                this.initializeCalendarOptions();
                console.log(this.holidays)

              }
          },
          error: (err) => {
              console.log(err.message, "jjjjjj");
          }
        })
      }
  }



  private initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: this.events,  // Assign the populated events array
      dateClick: this.handleDateClick.bind(this),

      eventMouseEnter: this.handleEventMouseEnter.bind(this),
      eventMouseLeave: this.handleEventMouseLeave.bind(this),
      dayCellClassNames: (dateInfo) => this.getDayCellClassNames(dateInfo)
    };
  }

  getDayCellClassNames(dateInfo: any): string[] {
    const dateString =  dateInfo.date.toLocaleDateString('en-CA')// Format date as YYYY-MM-DD

    if (dateString < new Date().toLocaleDateString('en-CA')) {
      return ['disabled-date'];
    }

    if (this.holidays?.includes(dateString)) {
      return ['holiday-cell'];
    }
    return [];
  }

  handleDateClick(arg: any) {
    this.selectedEvent = arg.dateStr;

    const today = new Date().toLocaleDateString('en-CA');
    if (arg.dateStr < today) {
        return;
    }
    if(!this.holidays.includes(this.selectedEvent)){
      this.showModal = true;
    }
  }

  handleEventMouseEnter(arg: any) {

  }

  handleEventMouseLeave(arg: any) {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
  }

  onCloseModal() {
    this.showModal = false;
  }

  onAddEvent(){
    this.showAddEvent = true;
  }

  onAddHoliday(){
      if(this.user === 'venue-vendor'){
          this.venuvendorservice.addHoliday(this.selectedEvent).subscribe({
            next: (res) => {
               console.log("success", res.data.date, this.holidays)
               this.holidays.push(this.selectedEvent); // Add the new holiday date to the array
               console.log(this.holidays)
               this.initializeCalendarOptions(); // Re-render the
            },
            error: (err) => {
                 console.log("adding holiday error")
            }
          })
      } else if(this.user === 'event-planner'){
          this.eventplannerservice.addHoliday(this.selectedEvent).subscribe({
            next: (res) => {
               console.log("success", res.data.date, this.holidays)
               this.holidays.push(this.selectedEvent); // Add the new holiday date to the array
               console.log(this.holidays)
               this.initializeCalendarOptions(); // Re-render the
            },
            error: (err) => {
                 console.log("adding holiday error")
            }
          })
      }
      this.showModal = false;
  }

  onAddEventCancel(){
    this.showAddEvent = false;
  }

  onSubmitAddEvent(){
      console.log("clicked")
      if(this.eventForm.valid){
        if(this.user === 'venue-vendor'){
          this.venuvendorservice.addNewEvent(this.selectedEvent).subscribe({
            next: (res) => {
               console.log("success", res.data)

               this.initializeCalendarOptions(); // Re-render the
            },
            error: (err) => {
                 console.log("adding holiday error")
            }
          })
      } else if(this.user === 'event-planner'){
          this.eventplannerservice.addNewEvent(this.selectedEvent).subscribe({
            next: (res) => {
                console.log("success", res.data)
                this.initializeCalendarOptions(); // Re-render the
            },
            error: (err) => {
                 console.log("adding holiday error")
            }
          })
        }
      } else {
        this.eventForm.markAllAsTouched()
      }
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.eventForm, fieldName);
  }
}
// [
//   { title: 'Event 1', date: '2024-08-12', classNames: ['event-1'] },
//   { title: 'Event 2', date: '2024-08-15', classNames: ['event-2'] }
// ]

//private formatDate(date: string): string {
  //   const d = new Date(date);
  //   const year = d.getFullYear();
  //   const month = String(d.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so we add 1
  //   const day = String(d.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;  // Returns in YYYY-MM-DD format
  // }


      // const tooltip = document.createElement('div');
    // tooltip.className = 'tooltip hidden absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg';
    // tooltip.innerText = arg.event.extendedProps.details;
    // document.body.appendChild(tooltip);

    // const rect = arg.el.getBoundingClientRect();
    // tooltip.style.left = `${rect.left + window.scrollX}px`;
    // tooltip.style.top = `${rect.top + window.scrollY + rect.height}px`;

    // tooltip.classList.remove('hidden');
    // eventContent: this.renderEventContent.bind(this),
    // renderEventContent(eventInfo: any) {
    //   const title = eventInfo.event.title;
    //   return {
    //     html: `<div class="p-2 border rounded text-center ${eventInfo.event.classNames.join(' ')}">${title}</div>`
    //   };
    // }
