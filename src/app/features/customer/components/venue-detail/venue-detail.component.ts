import { venueService } from './../../services/venue.service';
import { Component, Input, OnInit } from '@angular/core';
import { DetailAreasComponent } from '../../../../shared/components/common/detail-areas/detail-areas.component';
import { DetailAboutComponent } from '../../../../shared/components/customer/detail-about/detail-about.component';
import { DetailWorksComponent } from '../../../../shared/components/common/detail-works/detail-works.component';
import { DetailReviewsComponent } from '../../../../shared/components/customer/detail-reviews/detail-reviews.component';
import { BrowseSimilarComponent } from '../../../../shared/components/customer/browse-similar/browse-similar.component';
import { CheckAvailabilityComponent } from '../../../../shared/components/customer/check-availability/check-availability.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IVenue } from '../../../../core/models/venue.model';
import { VenueBodyDetailComponent } from '../../../../shared/components/common/venue-body-detail/venue-body-detail.component';
import { environment } from '../../../../../environments/environment';
import { SubNavbarComponent } from '../../../../shared/components/customer/sub-navbar/sub-navbar.component';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { VideoCallComponent } from '../../../../shared/components/common/video-call/video-call.component';
import { ToastrService } from 'ngx-toastr';
import { CustomerWebRTCService } from '../../services/customerWebrtc.service';
import { CommonService } from '../../../../core/services/common.service';
import { ChatRoomComponent } from '../../../../shared/components/common/chat-room/chat-room.component';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';

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
    ChatRoomComponent
  ],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.css'
})


export class VenueDetailComponent implements OnInit{
  venueData!: IVenue;
  allMenus = ['AREAS', 'ABOUT', 'ADDRESS' ,'SERVICES', 'WORKS'];
  @Input({required: true}) slug: string = '';
  imageUrl: string = '';
  isLoading: boolean = true;
  showCallAlertModal = false;
  showVideoCallModal = false;
  showChatRoomModal = false;
  portUrl = environment.vv_portfolio_url;
  eventTypes = this.commonservice.getEventTypes();


  constructor(
    private commonservice: CommonService,
    private toastr: ToastrService,
    private venueService: venueService,
    private webrtcservices: CustomerWebRTCService,
    private chatroomservice: ChatRoomService
  ){}

  ngOnInit(): void {
    this.venueService.getVenueDetails(this.slug).subscribe({
      next: (res) => {
        if (res.data?.venueData) {
          this.venueData = res.data.venueData;
          this.imageUrl = `${environment.baseUrl}${environment.vv_coverpic_url}${this.venueData.coverPic}`;
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error:', err.message);
        this.isLoading = false;
        this.toastr.error('something went wrong!', 'error');
      }
    });
  }

  startCall() {
    this.showCallAlertModal = true;
  }

  async startChat() {
    if(!this.showChatRoomModal){
      await this.chatroomservice.joinChatRoom(this.venueData.vendorId)
    }
    this.showChatRoomModal = !this.showChatRoomModal;
  }

  onCloseCallAlertModal() {
    this.showCallAlertModal = false;
  }

  async onConfirmVideoCall(){
    try {
      await this.webrtcservices.startCall(this.venueData.vendorId);
      this.showCallAlertModal = false;
      this.showVideoCallModal = true;
    } catch (error) {
      console.error('Failed to start call:', error);
      this.toastr.error('something went wrong!', 'error');
    }
  }

  onCloseVideoCall(){
    this.showVideoCallModal = false;
  }

  async onCloseChatRoom(){
    this.showChatRoomModal = false;
    await this.chatroomservice.leaveChatRoom(environment.customer);
  }
}
