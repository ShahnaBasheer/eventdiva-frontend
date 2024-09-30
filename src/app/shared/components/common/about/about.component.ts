import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
      this.customerservice.getAboutPage().subscribe({
        next: (res) => {
           console.log(res.data);
        }
      })
  }
}
