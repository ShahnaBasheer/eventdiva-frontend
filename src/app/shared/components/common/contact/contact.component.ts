import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../features/customer/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})


export class ContactComponent implements OnInit{


  constructor(
    private customerservice: CustomerService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.customerservice.getContactPage().subscribe({
      next: (res) => {
          console.log(res)
      },
      error: (err) => {
          this.toastr.error(err.error.message);
      }
    });
  }

}
