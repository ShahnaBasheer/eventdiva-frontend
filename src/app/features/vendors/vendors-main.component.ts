import { Component } from '@angular/core';
import { SignupVendorComponent } from '../../shared/components/vendors/signup-vendor/signup-vendor.component';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { VendorBroadcastChannelService } from './services/broadcast-vendor.service';
import { Store } from '@ngrx/store';
import { logOutSuccess, vendorLoginSuccess } from './store/vendor.actions';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../core/services/jwtToken.service';


@Component({
  selector: 'app-vendors-main',
  standalone: true,
  imports: [
    RouterModule,
    SignupVendorComponent,
  ],
  templateUrl: './vendors-main.component.html',
  styleUrl: './vendors-main.component.css'
})


export class VendorsMainComponent {
  private subscription: Subscription;

  constructor(
      private vendorbroadcast: VendorBroadcastChannelService,
      private store: Store,
      private jwTokenService: TokenService
    ){
      this.subscription = this.vendorbroadcast.messages$.subscribe(message => {
        if (message?.type === 'VENDOR_LOGOUT') {
          this.store.dispatch(logOutSuccess());
        }
      });
    }

    ngOnInit(): void{
      const storedUser = localStorage.getItem(environment.vendorInfo);
      const token = this.jwTokenService.getToken(environment.vn_accessKey) || '';

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.store.dispatch(vendorLoginSuccess({user, token}));
        } catch (error: any) {
          console.error('Error parsing stored user:', error.message);
        }
      }
    }


    ngOnDestroy(): void {
      // Clean up subscription
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
