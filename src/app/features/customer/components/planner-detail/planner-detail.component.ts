import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BrowseSimilarComponent } from '../../../../shared/components/customer/browse-similar/browse-similar.component';
import { CheckAvailabilityComponent } from '../../../../shared/components/customer/check-availability/check-availability.component';
import { PlannerBodyDetailComponent } from '../../../../shared/components/common/planner-body-detail/planner-body-detail.component';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { PlannerService } from '../../services/planner.service';
import { CommonModule } from '@angular/common';
import { SubNavbarComponent } from '../../../../shared/components/customer/sub-navbar/sub-navbar.component';
import { environment } from '../../../../../environments/environment';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { CustomerWebRTCService } from '../../services/customerWebrtc.service';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { VideoCallComponent } from '../../../../shared/components/common/video-call/video-call.component';
import { Router, RouterModule } from '@angular/router';
import { ChatRoomComponent } from '../../../../shared/components/common/chat-room/chat-room.component';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-planner-detail',
  standalone: true,
  imports: [
    BrowseSimilarComponent,
    CheckAvailabilityComponent,
    PlannerBodyDetailComponent,
    SubNavbarComponent,
    CommonModule,
    RouterModule,
    VideoCallComponent,
    LoaderComponent,
    ChatRoomComponent,
  ],
  templateUrl: './planner-detail.component.html',
  styleUrl: './planner-detail.component.css',
})
export class PlannerDetailComponent implements OnInit {
  @ViewChild('checkAvailabilitySection') checkAvailabilitySection!: ElementRef;
  @ViewChild('bookButton', { static: false }) bookButton!: ElementRef;
  @Input({ required: true }) slug: string = '';
  isBooking: boolean = false;
  isLoggedIn: boolean = false;
  allMenus = ['ABOUT', 'SERVICES', 'WORKS', 'WISHLIST'];
  eventPlannerData!: IEventPlanner;
  isLoading: boolean = true;
  showCallAlertModal = false;
  showVideoCallModal = false;
  showChatRoomModal = false;

  constructor(
    private plannerService: PlannerService,
    private webrtcservices: CustomerWebRTCService,
    private toastr: ToastrAlertService,
    private chatroomservice: ChatRoomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plannerService.getEventPlannerDetails(this.slug).subscribe({
      next: (res) => {
        if (res.data?.eventPlannerData) {
          this.eventPlannerData = res.data.eventPlannerData;
          this.isLoggedIn = !!res.data?.user;
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log('Error:', err.message);
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
        this.chatroomservice.joinChatRoom(this.eventPlannerData.vendorId);
      }
      this.showChatRoomModal = !this.showChatRoomModal;
    } else {
      this.toastr.info("Please log in to start a chat.")
      this.router.navigate(['/login']);
    }

  }

  onCloseModal() {
    this.showCallAlertModal = false;
  }

  async onConfirmVideoCall() {
    try {
      await this.webrtcservices.startCall(this.eventPlannerData.vendorId);
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
      this.router.navigate([
        '/event-planners',
        this.eventPlannerData.slug,
        'booking',
      ]);
    }
  }

  onAvailabilityChecked(isAvailable: boolean) {
    this.isBooking = isAvailable;
    if (isAvailable && this.bookButton) {
      this.bookButton.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onCloseChatRoom() {
    this.showChatRoomModal = false;
  }


}
