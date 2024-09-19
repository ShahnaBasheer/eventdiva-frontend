import { Component, OnInit } from '@angular/core';
import { VendorSidebarComponent } from '../../../../shared/components/vendors/vendor-sidebar/vendor-sidebar.component';
import { HeaderComponent } from '../../../../shared/components/vendors/header/header.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from '../../store/vendor.selectors';
import { VendorWebRTCService } from '../../services/vendorWebrtc.service';

@Component({
  selector: 'app-event-planners',
  standalone: true,
  imports: [
    RouterModule,
    VendorSidebarComponent,
    HeaderComponent
  ],
  templateUrl: './all-vendors.component.html',
  styleUrl: './all-vendors.component.css'
})

export class AllVendorsComponent implements OnInit{
  firstname = '';
  vendorType = '';
  vendorId = '';


  constructor(private store: Store, private vendorwebrtcservice: VendorWebRTCService){}

  ngOnInit(): void {
      this.store.select(getUser).subscribe(user => {
        this.firstname = user?.firstName || '';
        this.vendorType = user?.vendorType || '';
        this.vendorId = user?.id || '';
      })
  }

}
