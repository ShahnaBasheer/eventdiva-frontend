import { Component, OnInit } from '@angular/core';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { CustomerService } from '../../../../features/customer/services/customer.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})



export class AboutComponent implements OnInit{


  constructor(
    private customerservice: CustomerService,
    private toastr: ToastrAlertService
  ){}

  ngOnInit(): void {
      this.customerservice.getAboutPage().subscribe({
        next: (res) => {
           console.log(res.data);
        }
      })
  }
}
