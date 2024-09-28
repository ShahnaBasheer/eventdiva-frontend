import { Component, Input } from '@angular/core';
import { Customer } from '../../../../core/models/customer.model';
import { Vendor } from '../../../../core/models/vendor.model';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../../../features/admin/services/customers.service';
import { VendorsService } from '../../../../features/admin/services/vendors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {

  @Input({required: true}) users!: Customer[] | Vendor[] | any [];
  @Input({required: true}) headers!: string[];

  constructor(
    private toastr: ToastrService,
    private customersService: CustomersService,
    private vendorsService: VendorsService,
  ){}

  onBlockChange(id: string | undefined, role: string | undefined, isBlocked: boolean) {
      if(id && role){
          if(role === 'customer'){
              if (isBlocked) this.unblockCustomer(id);
              else this.blockCustomer(id);
          } else if( role === 'vendor'){
              if (isBlocked) this.unblockVendor(id);
              else this.blockVendor(id);
          }
      }
  }

  blockCustomer(id: string) {
    this.customersService.blockCustomer(id).subscribe({
      next: (res) => {
        console.log('Customer blocked successfully:', res);
        this.updateUserStatus(id, true, 'customer');
        this.toastr.success('Customer blocked successfully!');
      },
      error: (err) => {
        console.error('Error blocking customer:', err?.message);
        this.toastr.error("failed to Block Customer")
      }
    });
  }

  unblockCustomer(id: string) {
    this.customersService.unblockCustomer(id).subscribe({
      next: (res) => {
        console.log('Customer unblocked successfully:', res);
        this.updateUserStatus(id, false, 'customer');
        this.toastr.success('Customer unblocked successfully!');
      },
      error: (err) => {
        console.error('Error unblocking customer:', err?.message);
        this.toastr.error("failed to unblock Customer")
      }
    });
  }


  blockVendor(id: string) {
    this.vendorsService.blockVendor(id).subscribe({
      next: (res) => {
        console.log('Vendor blocked successfully:', res);
        this.updateUserStatus(id, true, 'vendor');
        this.toastr.success('Vendor blocked successfully!');
      },
      error: (err) => {
        console.error('Error blocking Vendor:', err?.message);
        this.toastr.error("failed to block Vendor")
      }
    });
  }

  unblockVendor(id: string) {
    this.vendorsService.unblockVendor(id).subscribe({
      next: (res) => {
        console.log('Vendor unblocked successfully:', res);
        this.updateUserStatus(id, false, 'vendor');
        this.toastr.success('Vendor unblocked successfully!');
      },
      error: (err) => {
        console.error('Error unblocking Vendor:', err?.message);
        this.toastr.error("failed to unblock Vendor")
      }
    });
  }

  private updateUserStatus(id: string, isBlocked: boolean, role: string) {
    const userToUpdate = this.users.find(user => user._id === id && user.role === role);
    if (userToUpdate) {
      userToUpdate.isBlocked = isBlocked;
    }
  }
}



