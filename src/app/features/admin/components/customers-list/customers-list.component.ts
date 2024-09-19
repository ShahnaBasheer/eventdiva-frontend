import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { UserTableComponent } from '../../../../shared/components/admin/user-table/user-table.component';
import { Customer } from '../../../../core/models/customer.model';



@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [ CommonModule,  UserTableComponent ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})


export class CustomersListComponent implements OnInit{
  headers = [ 'SL.No', 'Name', 'Address', 'Mobile', 'Email', 'Block', 'Action'];
  customers: Customer[] = []

  constructor(private customersService: CustomersService){}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.customersService.getCustomersPage().subscribe({
      next: (response) => {
          this.customers = response.data.customers;
      },
      error: (err) => {
        console.log('Error loading dashboard:',err);
      },
      complete: () => {
        console.log('Dashboard loading complete');
      }
    })
  }

}
