import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorWebRTCService } from '../../../../features/vendors/services/vendorWebrtc.service';
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../../../features/vendors/store/vendor.selectors';

@Component({
  selector: 'app-reciever-video-call',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './reciever-video-call.component.html',
  styleUrl: './reciever-video-call.component.css'
})


export class RecieverVideoCallComponent implements AfterViewInit, OnDestroy{
  @Output() hideVideoCallModal = new EventEmitter<boolean>();
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  showControls = true;
  message: string = '';
  isLogged = false;

  constructor(
    protected webRTCService: VendorWebRTCService,
    private toastr: ToastrAlertService,
    private store: Store
  ){}

  ngAfterViewInit(): void {
    this.webRTCService.getLocalStreamObservable().subscribe(stream => {
      if (this.localVideo && this.localVideo.nativeElement
        && this.localVideo.nativeElement.parentNode && stream?.active
      ) {
        this.localVideo.nativeElement.srcObject = stream;
        this.localVideo.nativeElement.play().catch(error => {
          console.error('Error playing local video:', error);
        });
      }
    });

    this.webRTCService.getRemoteStreamObservable().subscribe(stream => {
      if (this.remoteVideo && this.remoteVideo.nativeElement
        && this.remoteVideo.nativeElement.parentNode && stream?.active
      ) {
        this.remoteVideo.nativeElement.srcObject = stream;
        this.remoteVideo.nativeElement.play().catch(error => {
          console.error('Error playing remote video:', error);
        });
      }
    });
  }

  ngOnInit(): void{
    this.store.select(isLoggedIn).subscribe(data => this.isLogged = data);
    this.webRTCService.getMessageClear();

    if(this.isLogged){
      this.webRTCService.messageCall$.subscribe(message => {
        if (message) {
            this.message = message;
            this.localVideo.nativeElement.srcObject = null;
            this.remoteVideo.nativeElement.srcObject = null;
            this.hideVideoCallModal.emit();
            this.toastr.error(this.message);
        }
      });
    }
  }


  endCall() {
    this.webRTCService.endCall();
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
    this.hideVideoCallModal.emit();
  }

  toggleControls() {
    this.showControls = !this.showControls;
  }

  toggleAudio() {
    this.webRTCService.toggleAudio();
  }

  toggleVideo() {
    this.webRTCService.toggleVideo();
  }

  ngOnDestroy(){
    this.endCall();
  }
}
