import { Component, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { vendorLogOut } from '../../../../features/vendors/store/vendor.actions';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { VendorWebRTCService } from '../../../../features/vendors/services/vendorWebrtc.service';
import { RecieverVideoCallComponent } from '../../common/reciever-video-call/reciever-video-call.component';
import { isLoggedIn } from '../../../../features/vendors/store/vendor.selectors';
import { NotificationService } from '../../../../core/services/notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Notification } from '../../../../core/models/notification.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RecieverVideoCallComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':leave', [
        animate('0.4s ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})


export class HeaderComponent {
  @Input({ required: true }) firstname = '';
  showNotifications = false;
  showModal = false;
  showVideoCallModal = false;
  AllNotifications: Notification[] = [];
  unreadCount: number = 0;
  isIncomingCall = false;
  isLogged = false;

  private subscriptions: Subscription = new Subscription();


  constructor(
    private store: Store,
    private toastr: ToastrService,
    private webrtcservices: VendorWebRTCService,
    private notificationservice: NotificationService,
  ){}

  ngOnInit() {
    this.store.select(isLoggedIn).subscribe( data => {
      console.log(data, "notificagtion in header")
      if(data){
        this.notificationservice.fetchNotifications('/vendor').subscribe(res => {
          console.log(res.data, "data dlow here");
          this.notificationservice.addNotifications(res.data?.notifications);
          this.unreadCount = res.data?.readCount;
        });
      }
    });

    const notificationsSubscription = this.notificationservice.notifications$.subscribe( data => {
      this.AllNotifications =  data;
      this.unreadCount++;
    })

    // Add first subscription
    this.subscriptions.add(notificationsSubscription);

    const incomingCallSubscription = this.webrtcservices.incomingCall$.subscribe({
      next: (data) => {
        if (data) this.isIncomingCall = true;
        else this.isIncomingCall = false;
      },
      error: (err) => {
        console.error('Error receiving call:', err);
      }
    });

    this.subscriptions.add(incomingCallSubscription);
  }

  public endCall() {
    this.webrtcservices.endCall();
  }


  onLogout(){
    this.store.dispatch(vendorLogOut());
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  startCall() {
    this.showModal = true;
  }



  onCloseModal() {
    this.showModal = false;
  }
  onCloseVideoCall(){
    this.showVideoCallModal = false;
    this.isIncomingCall = false;
  }

  async onAcceptVideoCall() {
    try {
      await this.webrtcservices.acceptCall()
      this.showModal = false; // Close the confirmation modal
      this.showVideoCallModal = true; // Show the video call component

    } catch (error) {
       console.log(error, "error in vendor video")
    }

  }


  onRejecteVideoCall(): void {
    this.showModal = false; // Close the modal
    this.webrtcservices.rejectCall(); // Reject the call
    this.isIncomingCall = false;
    this.toastr.error('Call is rejected', 'error');
  }

  onRead(id: string, isRead: boolean, index: number){
    if(!isRead){
        this.notificationservice.onIsReadChange(id).subscribe({
            next: (res: any) => {
              if(res?.data){
                this.AllNotifications[index].isRead = true;
                this.unreadCount--;
              }
            }
        })
    }
  }

  onDeleteNotification(id: string, index: number){
      this.notificationservice.ondeleteNotification(id).subscribe({
          next: (res) => {
              if(!this.AllNotifications[index].isRead) this.unreadCount--;
              this.AllNotifications.splice(index, 1);
          },
          error: (err) => {

          }
      })
  }

  @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event): void {
      const target = event.target as HTMLElement;

      if (!target.closest('#notification-btn') && !target.closest('#notification-content')) {
        this.showNotifications= false;
      }
    }

  ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.unsubscribe();
    }
  }
}
