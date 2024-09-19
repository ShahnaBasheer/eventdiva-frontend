import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavComponent } from '../../../shared/components/admin/sidebar-nav/sidebar-nav.component';
import { Store } from '@ngrx/store';
import * as AdminActions from '../store/admin.actions';
import { getUser } from '../store/admin.selectors';
import { Subscription } from 'rxjs';
import { AdminBroadcastChannelService } from '../services/broadcast-admin.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarNavComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent implements OnInit, OnDestroy {
  fullName!: string;
  private subscription: Subscription;


  constructor(private store: Store, private adminbroadcast: AdminBroadcastChannelService){
    this.subscription = this.adminbroadcast.messages$.subscribe(message => {
      if (message?.type === 'ADMIN_LOGOUT') {
        this.store.dispatch(AdminActions.logOutSuccess());
      }
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem(environment.adminInfo);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.store.dispatch(AdminActions.adminLoginSuccess({user}));
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    this.store.select(getUser).subscribe(user => {
        this.fullName = user?.fullName || '';
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
