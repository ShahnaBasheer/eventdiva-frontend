import { Component } from '@angular/core';
import { Vendor } from '../../../../core/models/vendor.model';
import { VendorsService } from '../../services/vendors.service';
import { UserTableComponent } from '../../../../shared/components/admin/user-table/user-table.component';
import { PageLoaderComponent } from '../../../../shared/components/common/page-loader/page-loader.component';
import { SortSearchComponent } from '../../../../shared/components/admin/sort-search/sort-search.component';
import { CommonModule } from '@angular/common';
import { AdminPaginationComponent } from '../../../../shared/components/admin/admin-pagination/admin-pagination.component';

@Component({
  selector: 'app-vendors-list',
  standalone: true,
  imports: [
      UserTableComponent, PageLoaderComponent,
      SortSearchComponent, CommonModule,
      AdminPaginationComponent
   ],
  templateUrl: './vendors-list.component.html',
  styleUrl: './vendors-list.component.css'
})


export class VendorsListComponent {
  headers = [ 'SL.No', 'Name', 'vendor Type' , 'Mobile', 'Email', 'Block', 'Action'];
  vendors!: Vendor[];
  page: number = 1;
  limit: number = 10;
  isLoading = true;
  totalPages = 1;
  totalCount = 0;

  constructor(private vendorService: VendorsService){}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.vendorService.getVendorsPage(this.page, this.limit).subscribe({
      next: (res) => {
          this.vendors = res.data.users;
          this.totalPages = res.data?.totalPages || 1;
          this.totalCount = res.data?.totalCount || 0;
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
    this.loadVendors();
  }

  onPageSizeLimit(data: number){
    this.limit = data;
    this.isLoading = true;
    this.loadVendors();
  }

}
