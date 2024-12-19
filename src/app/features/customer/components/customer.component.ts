import { FooterComponent } from '../../../shared/components/customer/footer/footer.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarCustomerComponent } from '../../../shared/components/customer/navbar-customer/navbar-customer.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from '../store/customer.selectors';
import { loginSuccess, logOutSuccess } from '../store/customer.actions';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { CustomerBroadcastChannelService } from '../services/broadcast-customer.service';
import { TokenService } from '../../../core/services/jwtToken.service';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NavbarCustomerComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})


export class CustomersComponent implements OnInit, OnDestroy{
  firstname!:string | null;
  private subscription: Subscription;

  constructor(
      private store: Store,
      private customerbroadcast: CustomerBroadcastChannelService,
      private jwTokenService: TokenService
  ){
    this.subscription = this.customerbroadcast.messages$.subscribe(message => {
      if (message?.type === 'CUSTOMER_LOGOUT') {
        this.store.dispatch(logOutSuccess());
      }
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem(environment.customerInfo);
    const token = this.jwTokenService.getToken(environment.cu_accessKey);

    if (storedUser && token) {
        try {
            const user = JSON.parse(storedUser);
            this.store.dispatch(loginSuccess({user, token}));
        } catch (error) {
            console.error('Error parsing stored user:', error);
        }
    }

    this.store.select(getUser).subscribe(user => {
        this.firstname = user?.firstName || '';
    })
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
