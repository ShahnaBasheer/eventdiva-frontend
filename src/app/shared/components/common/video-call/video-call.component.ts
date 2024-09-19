import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerWebRTCService } from '../../../../features/customer/services/customerWebrtc.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../../../features/customer/store/customer.selectors';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})

export class VideoCallComponent implements AfterViewInit, OnInit, OnDestroy {
  @Output() hideVideoCallModal = new EventEmitter<boolean>();
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  @Input({required: true}) remoteId!: string ;
  message: string = '';
  ended = false;
  isLogged = false;


  showControls = true;

  constructor(
    private webRTCService: CustomerWebRTCService,
    private toastr: ToastrService,
    private store: Store) {}

  ngAfterViewInit(): void {
    this.webRTCService.getRemoteStreamObservable().subscribe(stream => {
      if (this.remoteVideo && this.remoteVideo.nativeElement
        && this.remoteVideo.nativeElement.parentNode
      ) {
        this.remoteVideo.nativeElement.srcObject = stream;
        if(stream?.active){
          this.remoteVideo.nativeElement.play()
          .catch(error => {
            console.error('Error playing remote video:', error);
            // Handle error, e.g., show error message to user
          });
        }

      }
    });

    this.webRTCService.getLocalStreamObservable().subscribe(stream => {
      if (this.localVideo && this.localVideo.nativeElement
        && this.localVideo.nativeElement.parentNode
      ) {
        this.localVideo.nativeElement.srcObject = stream;
        if(stream?.active){
          this.localVideo.nativeElement.play()
          .catch(error => {
            console.error('Error playing local video:', error);
            // Handle error, e.g., show error message to user
          });
        }

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
    console.log("yes i am calling now")
    this.endCall();
  }

}
