import { venueService } from './../../services/venue.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DetailAreasComponent } from '../../../../shared/components/common/detail-areas/detail-areas.component';
import { DetailAboutComponent } from '../../../../shared/components/customer/detail-about/detail-about.component';
import { DetailWorksComponent } from '../../../../shared/components/common/detail-works/detail-works.component';
import { DetailReviewsComponent } from '../../../../shared/components/customer/detail-reviews/detail-reviews.component';
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
import { ToastrService } from 'ngx-toastr';
import { CustomerWebRTCService } from '../../services/customerWebrtc.service';
import { ChatRoomComponent } from '../../../../shared/components/common/chat-room/chat-room.component';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DetailAreasComponent,
    DetailAboutComponent,
    DetailWorksComponent,
    DetailReviewsComponent,
    BrowseSimilarComponent,
    CheckAvailabilityComponent,
    SubNavbarComponent,
    VenueBodyDetailComponent,
    LoaderComponent,
    VideoCallComponent,
    ChatRoomComponent,
  ],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.css',
})
export class VenueDetailComponent implements OnInit {
  @ViewChild('checkAvailabilitySection') checkAvailabilitySection!: ElementRef;
  @ViewChild('bookButton', { static: false }) bookButton!: ElementRef;
  isBooking: boolean = false;
  venueData!: IVenue;
  allMenus = ['AREAS', 'ABOUT', 'ADDRESS', 'SERVICES', 'WORKS', 'WISHLIST'];
  @Input({ required: true }) slug: string = '';
  isLoading: boolean = true;
  showCallAlertModal = false;
  showVideoCallModal = false;
  showChatRoomModal = false;

  constructor(
    private toastr: ToastrService,
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
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error:', err.message);
        this.isLoading = false;
        this.toastr.error('something went wrong!', 'error');
      },
    });
  }

  startCall() {
    this.showCallAlertModal = true;
  }

  async startChat() {
    if (!this.showChatRoomModal) {
      this.chatroomservice.joinChatRoom(this.venueData.vendorId);
    }
    this.showChatRoomModal = !this.showChatRoomModal;
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
      this.toastr.error('something went wrong!', 'error');
    }
  }

  onCloseVideoCall() {
    this.showVideoCallModal = false;
  }

  async onCloseChatRoom() {
    this.showChatRoomModal = false;
    await this.chatroomservice.leaveChatRoom(environment.customer);
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
