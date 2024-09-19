import { Component, HostListener, Input } from '@angular/core';
import { IPlannerBooking } from '../../../../core/models/IPlannerBooking.model';
import { PlannerBookingService } from '../services/planner-booking.service';
import { CommonModule } from '@angular/common';
import { DateCalendarComponent } from '../../../../shared/components/common/date-calendar/date-calendar.component';
import { CurrencyFormat } from '../../../../core/pipes/currency-format.pipe';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';

@Component({
  selector: 'app-planner-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    DateCalendarComponent,
    CurrencyFormat,
    RouterModule,
    ReactiveFormsModule
   ],
  templateUrl: './planner-booking-details.component.html',
  styleUrl: './planner-booking-details.component.css'
})


export class PlannerBookingDetailsComponent {
  advancePaymentForm!: FormGroup;
  @Input({ required: true }) bookingId!: string;
  item!: IPlannerBooking;
  status = ['confirmed', 'cancelled', 'completed'];
  addSummaryModal: boolean = false;
  generateAdvanceModal: boolean = false;
  statusDropdown: boolean = false;

  constructor(
    private plannerBookingService: PlannerBookingService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
      this.advancePaymentForm = this.fb.group({
        "advancePayment": ['', [Validators.required, Validators.min(100), Validators.pattern('^[0-9]+$')]],
        "bookingId": [this.bookingId, Validators.required]
      });

      this.plannerBookingService.getPlannerBookingDetail(this.bookingId).subscribe({
        next: (res) => {
            this.item = res?.data?.bookingData;
        },
        error: (err: any) => {
           console.log(err)
        }
      })
  }
  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.advancePaymentForm, fieldName);
  }

  onChangeStatus(status: string){
      this.plannerBookingService.statusChange(this.bookingId, status).subscribe({
        next: (res) => {
           this.item = res?.data?.bookingData;
        },
        error: (err) => {
          if(err.status == 400) {
            this.toastr.error(err?.error?.message, 'error');
          } else {
            this.toastr.error("Status changing has been failed! Try Later!", 'error');
          }
        }
      });
  }

  onSendAdvancePaymentSubmit(): void {
    if (this.advancePaymentForm.valid) {
      console.log(this.advancePaymentForm.valid, this.advancePaymentForm.value, "heyyyyy");
      this.plannerBookingService.sendAdvancePayment(this.advancePaymentForm.value).subscribe({
        next: (res) => {
          this.item = res?.data?.bookingData;
          this.toastr.success("Successfully Generated Advance Payment!", 'success');
        },
        error: (err) => {
            this.toastr.error("Status changing has been failed! Try Later!", 'error');
        }
      })
    } else {
      this.advancePaymentForm.markAllAsTouched();
    }
  }

  onDisplayAddSummary(){
    this.addSummaryModal = true;
  }

  onCancelAddSummary(){
    this.addSummaryModal = false;
  }

  onDisplayAdvancePayment(){
    this.generateAdvanceModal = true;
    console.log("clicked")
  }

  onCancelAdvancePayment(){
    this.generateAdvanceModal = false;
  }

  onShowStatusDropdown(){
    this.statusDropdown = !this.statusDropdown;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('#status-dropcontent') && !target.closest('#statusDropdown-btn')) {
      this.statusDropdown = false;
    }
  }
}
