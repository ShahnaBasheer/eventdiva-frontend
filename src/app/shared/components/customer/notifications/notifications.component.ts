import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';
import { TimeAgoPipe } from '../../../../core/pipes/timeAgo.pipe';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../../../features/customer/store/customer.selectors';
import { Notification } from '../../../../core/models/notification.model';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ CommonModule, TimeAgoPipe ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':leave', [
        animate('0.4s ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})


export class NotificationsComponent implements OnInit{
  AllNotifications: Notification[] = [];
  showNotifications = false;
  unreadCount: number = 0;
  isLogged = false;
  private subscriptions: Subscription = new Subscription();


  constructor(private notificationservice: NotificationService, private store: Store){}

  ngOnInit(): void{

      this.store.select(isLoggedIn).subscribe(data => this.isLogged = data)

      if(this.isLogged){
        this.notificationservice.fetchNotifications(environment.customerUrl).subscribe(res => {
          this.notificationservice.addNotifications(res.data?.notifications);
          this.unreadCount = res.data?.readCount;
        });
      }


      const notificationsSubscription = this.notificationservice.notifications$.subscribe( data => {
        this.AllNotifications =  data;
        this.unreadCount++;
      })

      // Add first subscription
      this.subscriptions.add(notificationsSubscription);
  }


  toggleNotifications(): void {
    if(this.AllNotifications.length > 0){
      this.showNotifications = !this.showNotifications;
    }
  }

  onRead(id: string, isRead: boolean, index: number){
    if(!isRead){
      this.notificationservice.onIsReadChange(id, environment.customerUrl).subscribe({
          next: (res) => {
            if(res){
              this.AllNotifications[index].isRead = true;
              this.unreadCount--;
            }
          }
      })
    }
  }

  onDeleteNotification(id: string, index: number){
      this.notificationservice.ondeleteNotification(id, environment.customerUrl).subscribe({
          next: (res) => {
              if(!this.AllNotifications[index].isRead) this.unreadCount--;
              this.AllNotifications.splice(index, 1);
          },
          error: (err) => {

          }
      })
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.unsubscribe();
    }
  }
}
