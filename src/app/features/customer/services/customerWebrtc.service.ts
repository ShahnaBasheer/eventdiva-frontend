import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { VideoCallService } from '../../../core/services/video-call.service';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../store/customer.selectors';
import { SocketService } from '../../../core/services/socket.service';
import { Socket } from 'socket.io-client';



@Injectable()


export class CustomerWebRTCService implements OnDestroy{
  private socket!: Socket | null;
  private localStreamSubject: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  private peerConnection: RTCPeerConnection | null = null;
  private remoteStreamSubject: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  public roomId: string | null = null;
  private messageCallSubject = new BehaviorSubject<string | null>(null);

  public messageCall$ = this.messageCallSubject.asObservable();

  constructor(private videoCallService: VideoCallService,
    private store: Store,
    private socketService: SocketService,
  ) {
    this.store.select(isLoggedIn).subscribe(islogged => {
      if (islogged) {
        this.socket = this.socketService.getSocket();
        this.peerConnection = this.createPeerConnection();
        this.initializeSocketListeners();
      }
    });
  }


  private createPeerConnection(): RTCPeerConnection {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // STUN server
      ]
    });

    peerConnection.ontrack = (event) => {
      let remoteStream = this.remoteStreamSubject.getValue();
      if (!remoteStream) {
        remoteStream = new MediaStream();
        this.remoteStreamSubject.next(remoteStream);
      }
      event.streams[0].getTracks().forEach(track => {
        remoteStream?.addTrack(track);
      });
    };

    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === 'disconnected') {
      }
    };

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.socketService?.emit('candidate', { roomId: this.roomId, candidate});
      }
    };

    return peerConnection;
  }


  private initializeSocketListeners(): void {
    this.socket?.on('receive-answer', async(data: { answer: RTCSessionDescriptionInit; roomId: string }) => {
        if (data && this.peerConnection) {
          try {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
          } catch (error) {
            console.error('Error handling receive-answer:', error);
          }
        }
    });

    this.socket?.on('receive-candidate', async (data: { candidate: RTCIceCandidateInit | undefined }) => {
        if (data && this.peerConnection && this.peerConnection.remoteDescription) {
          try {
            if (data.candidate) {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
          } catch (error) {
            console.error('Error handling receive-candidate:', error);
          }
        }
    });

    this.socket?.on('vendor-call-rejected', async (data: { roomId: string }) => {
      this.messageCallSubject.next('Vendor has rejected the call!');
    });

    this.socket?.on('callEnded', async (data: { roomId: string }) => {
      this.messageCallSubject.next('Call Ended!');
    });

    this.socket?.on('call_failed', (data) => {
      this.messageCallSubject.next('Call Failed!');
    })

  }


  public async startCall(vendorId: string) {
    try {
      const response = await firstValueFrom(this.videoCallService.startCall(vendorId));
      this.roomId = response.data.roomId;
      let customerId = response.data.user.id;
      let customerName = response.data.user.firstName + " " + response.data.user.lastName
      this.socketService.emit('join-room', { roomId: this.roomId, customerId });
      await this.initializeLocalStream();
      await this.emitCallVendor(vendorId, customerId, customerName);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  }


  private async emitCallVendor(vendorId: string, userId: string, name: string) {
    try {
      // Check if local description is already set
      if(this.peerConnection){
        if (!this.peerConnection?.localDescription) {
          const offer = await this.peerConnection.createOffer();
          await this.peerConnection.setLocalDescription(offer);
          await this.socketService.emit('offer', { roomId: this.roomId, offer, vendorId });
        }
        this.socketService.emit('call_vendor', {
          vendorId: vendorId, clientId: userId,
          offer: this.peerConnection.localDescription,
          roomId: this.roomId, name });
      }
    } catch (error) {
      console.error('Error emitting call_vendor:', error);
    }
  }


  private async initializeLocalStream(): Promise<void> {
    try {
      if (this.peerConnection) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.localStreamSubject.next(stream);
        stream.getTracks().forEach(track => {
            if (this.peerConnection) {
              this.peerConnection.addTrack(track, stream);
            }
        });
      }
    } catch (error) {
      console.error('Error accessing local media:', error);
    }
  }


  public getRemoteStreamObservable() : Observable<MediaStream | null>{
    return this.remoteStreamSubject.asObservable();
  }

  public getLocalStreamObservable() : Observable<MediaStream | null>{
    return this.localStreamSubject.asObservable();
  }


  public endCall(): void {
    if(this.socket?.connected){
      const stream = this.localStreamSubject.getValue();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if(this.peerConnection){
          this.peerConnection.close();
          this.peerConnection.onicecandidate = null;
          this.peerConnection.oniceconnectionstatechange = null;
          this.peerConnection.onnegotiationneeded = null;
          if(this.roomId){
            console.log("ending call from customer", this.roomId)
            this.socketService.emit('end-call', { roomId: this.roomId });
          }
      }
      this.remoteStreamSubject.next(null);
      this.localStreamSubject.next(null);
      this.peerConnection = this.createPeerConnection();
      this.roomId = null;
    }
  }


  public toggleAudio(): boolean {
    let state = false;
    const stream = this.localStreamSubject.getValue();
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        state = track.enabled;
      });
    }
    return state;
  }

  public toggleVideo(): boolean {
    let state = false;
    const stream = this.localStreamSubject.getValue();
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        state = track.enabled;
      });
    }
    return state;
  }


  public getMessageClear(){
    return this.messageCallSubject.next(null);
  }

  public ngOnDestroy(): void {
    console.log('Service destroyed');
    if(this.peerConnection){
      this.endCall();
    }
  }
}
