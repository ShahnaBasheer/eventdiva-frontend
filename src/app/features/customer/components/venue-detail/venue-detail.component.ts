import { venueService } from './../../services/venue.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BrowseSimilarComponent } from '../../../../shared/components/customer/browse-similar/browse-similar.component';
import { CheckAvailabilityComponent } from '../../../../shared/components/customer/check-availability/check-availability.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IVenue } from '../../../../core/models/venue.model';
import { VenueBodyDetailComponent } from '../../../../shared/components/common/venue-body-detail/venue-body-detail.component';
import { environment } from '../../../../../environments/environment';
import { SubNavbarComponent } from '../../../../shared/components/customer/sub-navbar/sub-navbar.component';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { VideoCallComponent } from '../../../../shared/components/common/video-call/video-call.component';
import { ToastrAlertService } from '../../../../core/services/toastr.service';import { CustomerWebRTCService } from '../../services/customerWebrtc.service';
import { ChatRoomComponent } from '../../../../shared/components/common/chat-room/chat-room.component';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BrowseSimilarComponent,
    CheckAvailabilityComponent,
    SubNavbarComponent,
    VenueBodyDetailComponent,
    LoaderComponent,
    VideoCallComponent,
    ChatRoomComponent
],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.css',
})
export class VenueDetailComponent implements OnInit {
  @ViewChild('checkAvailabilitySection') checkAvailabilitySection!: ElementRef;
  @ViewChild('bookButton', { static: false }) bookButton!: ElementRef;
  isBooking: boolean = false;
  venueData!: IVenue;
  isLoggedIn: boolean = false;
  allMenus = ['AREAS', 'ABOUT', 'ADDRESS', 'SERVICES', 'WORKS'];
  @Input({ required: true }) slug: string = '';
  isLoading: boolean = true;
  showCallAlertModal = false;
  showVideoCallModal = false;
  showChatRoomModal = false;

  constructor(
    private toastr: ToastrAlertService,
    private venueService: venueService,
    private webrtcservices: CustomerWebRTCService,
    private chatroomservice: ChatRoomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.venueService.getVenueDetails(this.slug).subscribe({
      next: (res) => {
        if (res.data?.venueData) {
          this.venueData = res.data.venueData;
          this.isLoggedIn = !!res.data?.user;
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error:', err.message);
        this.isLoading = false;
        this.toastr.wrong();
      },
    });

  }

  startCall() {
    if(this.isLoggedIn){
      this.showCallAlertModal = true;
    } else {
      this.toastr.info("Please log in to start a video call.")
      this.router.navigate(['/login']);
    }
  }

  async startChat() {
    if(this.isLoggedIn){
      if (!this.showChatRoomModal) {
        this.chatroomservice.joinChatRoom(this.venueData.vendorId);
      }
      this.showChatRoomModal = !this.showChatRoomModal;
    } else {
      this.toastr.info("Please log in to start a chat.")
      this.router.navigate(['/login']);
    }
  }

  onCloseCallAlertModal() {
    this.showCallAlertModal = false;
  }

  async onConfirmVideoCall() {
    try {
      await this.webrtcservices.startCall(this.venueData.vendorId);
      this.showCallAlertModal = false;
      this.showVideoCallModal = true;
    } catch (error) {
      console.error('Failed to start call:', error);
      this.toastr.wrong();
    }
  }

  onCloseVideoCall() {
    this.showVideoCallModal = false;
  }

  onCloseChatRoom() {
    this.showChatRoomModal = false;
  }

  onBooking() {
    if (!this.isBooking) {
      // Scroll to check availability component
      this.checkAvailabilitySection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });

      // Show an alert or a pop-up
      this.snackBar.open('Please check availability before booking!', 'OK', {
        duration: 3000,
        panelClass: ['mat-mdc-snackbar-surface', 'snackbar-info'],
      });
    } else {
      // Proceed to booking
      this.router.navigate(['/venues', this.venueData.slug, 'booking']);
    }
  }

  onAvailabilityChecked(isAvailable: boolean) {
    this.isBooking = isAvailable;
    if (isAvailable && this.bookButton) {
      this.bookButton.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
