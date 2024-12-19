import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { UserTableComponent } from '../../../../shared/components/admin/user-table/user-table.component';
import { Customer } from '../../../../core/models/customer.model';
import { PaginationComponent } from '../../../../shared/components/customer/pagination/pagination.component';
import { AdminPaginationComponent } from '../../../../shared/components/admin/admin-pagination/admin-pagination.component';
import { PageLoaderComponent } from '../../../../shared/components/common/page-loader/page-loader.component';
import { SortSearchComponent } from "../../../../shared/components/admin/sort-search/sort-search.component";



@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, UserTableComponent,
    AdminPaginationComponent, PageLoaderComponent,
    SortSearchComponent
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})


export class CustomersListComponent implements OnInit{
  headers = [ 'SL.No', 'Name', 'Address', 'Mobile', 'Email', 'Block', 'Action'];
  customers!: Customer[];
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;

  constructor(private customersService: CustomersService){}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.customersService.getCustomersPage(this.page, this.limit).subscribe({
      next: (res) => {
          this.customers = res.data?.users;
          this.totalPages = res.data?.totalPages;
          this.totalCount = res.data?.totalCount;
          this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading dashboard:',err);
        this.isLoading = false;
      },

    })
  }

  onSelectPage(data: number){
    this.page = data;
    this.isLoading = true;
    this.loadCustomers();
  }

  onPageSizeLimit(data: number){
    this.limit = data;
    this.isLoading = true;
    this.loadCustomers();
  }

}
