import { Component, HostListener, Input } from '@angular/core';
import { PlannerBooking } from '../../../../core/models/plannerBooking.model';
import { PlannerBookingService } from '../services/planner-booking.service';
import { CommonModule } from '@angular/common';
import { DateCalendarComponent } from '../../../../shared/components/common/date-calendar/date-calendar.component';
import { RouterModule } from '@angular/router';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFieldInvalid } from '../../../../core/validators/forms.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-planner-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    DateCalendarComponent,
    RouterModule,
    ReactiveFormsModule
   ],
  templateUrl: './planner-booking-details.component.html',
  styleUrl: './planner-booking-details.component.css'
})


export class PlannerBookingDetailsComponent {
  advancePaymentForm!: FormGroup;
  chargeForm!: FormGroup;
  @Input({ required: true }) bookingId!: string;
  item!: PlannerBooking;
  status = ['confirmed', 'cancelled', 'completed'];
  fullPayment: number = 0;
  addSummaryModal: boolean = false;
  generateAdvanceModal: boolean = false;
  statusDropdown: boolean = false;

  constructor(
    private plannerBookingService: PlannerBookingService,
    private toastr: ToastrAlertService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
      this.advancePaymentForm = this.fb.group({
        "advancePayment": ['', [Validators.required, Validators.min(100), Validators.pattern('^[0-9]+$')]],
        "bookingId": [this.bookingId, Validators.required]
      });

      this.chargeForm = this.fb.group({
        planningFee: ['', [Validators.required, Validators.min(1000), Validators.pattern('^[0-9]+$')]],
        charges: this.fb.array([]) // Initializing the FormArray for charges
      });

      this.plannerBookingService.getPlannerBookingDetail(this.bookingId).subscribe({
        next: (res) => {
            this.item = res?.data?.bookingData;
            const totalServiceCharges = this.item.charges?.fullPayment?.servicesCharges.reduce((sum, charge) => sum + charge.cost, 0);
            this.fullPayment = totalServiceCharges + (this.item.charges.fullPayment.planningFee || 0);
        },
        error: (err: any) => {
           console.log(err)
        }
      })
  }

  isFieldError(formgroup: FormGroup, fieldName: string): boolean | undefined {
    return isFieldInvalid(formgroup, `${fieldName}`);
  }

  onChangeStatus(status: string){
      this.plannerBookingService.statusChange(this.bookingId, status).subscribe({
        next: (res) => {
           this.item = res?.data?.bookingData;
           this.toastr.success("Booking has been Confirmed!")
        },
        error: (err) => {
          if(err.status == 400) {
            this.toastr.error(err?.error?.message, 'error');
          } else {
            this.toastr.error("Status changing has been failed! Try Later!");
          }
        }
      });
  }

  onSendAdvancePaymentSubmit(): void {
    if (this.advancePaymentForm.valid) {
      this.plannerBookingService.sendAdvancePayment(this.advancePaymentForm.value).subscribe({
        next: (res) => {
          this.item = res?.data?.bookingData;
          this.generateAdvanceModal = false;
          this.toastr.success("Successfully Generated Advance Payment!");
        },
        error: (err) => {
            this.toastr.error("Status changing has been failed! Try Later!");
        }
      })
    } else {
      this.advancePaymentForm.markAllAsTouched();
    }
  }

  onDisplayAddPayment(){
    if(this.item.payments.length < 1){
      this.snackBar.open('Please Generate Advance Payment Atfirst!', 'OK', {
        duration: 2000,
        panelClass: ['mat-mdc-snackbar-surface', 'snackbar-info'],
      });
    } else { this.addSummaryModal = true; }

  }

  onCancelFullPayment(){
    this.addSummaryModal = false;
    this.chargeForm.reset();
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

  // Getter for charges FormArray
  get charges(): FormArray {
    return this.chargeForm.get('charges') as FormArray;
  }

  // Method to create a new FormGroup for a charge
  addCharge() {
    const chargeGroup = this.fb.group({
      chargeName: ['', Validators.required], // Charge Name (input text)
      amount: [0, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]] // Amount (input number)
    });
    this.charges.push(chargeGroup); // Push to the FormArray
  }

  // Method to remove a FormGroup from charges
  removeCharge(index: number) {
    this.charges.removeAt(index); // Remove the specific FormGroup
  }

  // Method to handle form submission (if needed)
  submitForm() {
    if (this.chargeForm.valid) {
      const chargesData = this.chargeForm.value;
      this.plannerBookingService.generateFullPayment(chargesData, this.item.bookingId).subscribe({
          next: (res) => {
             this.item = res.data.bookingData;
             this.fullPayment = res.data.fullPayment;
             this.toastr.success("Full Payment has been successflly generated!");
             this.addSummaryModal = false;
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.error.message);
          }
      })

    } else {
      console.log('Form is invalid');
      this.chargeForm.markAllAsTouched();
    }
  }
}
