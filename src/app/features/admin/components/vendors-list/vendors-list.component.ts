import { Component } from '@angular/core';
import { Vendor } from '../../../../core/models/vendor.model';
import { VendorsService } from '../../services/vendors.service';
import { UserTableComponent } from '../../../../shared/components/admin/user-table/user-table.component';

@Component({
  selector: 'app-vendors-list',
  standalone: true,
  imports: [ UserTableComponent ],
  templateUrl: './vendors-list.component.html',
  styleUrl: './vendors-list.component.css'
})


export class VendorsListComponent {

  headers = [ 'SL.No', 'Name', 'vendor Type' , 'Mobile', 'Email', 'Block', 'Action'];
  vendors: Vendor[] = []

  constructor(private vendorService: VendorsService){}
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(){
    this.vendorService.getVendorsPage().subscribe({
      next: (response) => {
          this.vendors = response.data.vendors;
          console.log(response.data)
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
