import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../features/customer/services/customer.service';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})


export class ContactComponent implements OnInit{
  isLoading = true;

  constructor(
    private customerservice: CustomerService,
    private toastr: ToastrAlertService
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerservice.getContactPage().subscribe({
      next: (res) => {
          console.log(res)
          this.isLoading = false;
      },
      error: (err) => {
          this.isLoading = false;
          // this.toastr.error(err.error.message || 'Something went wrong. Please Try again Later!');
      }
    });
  }

}
