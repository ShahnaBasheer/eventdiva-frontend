import { isLoggedIn } from './../../vendors/store/vendor.selectors';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { VideoCallService } from '../../../core/services/video-call.service';
import { SocketService } from '../../../core/services/socket.service';
import { Store } from '@ngrx/store';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})


export class VendorWebRTCService implements OnDestroy {
  private socket!: Socket | null;
  private localStreamSubject: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  private remoteStreamSubject: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  private incomingCallSubject = new BehaviorSubject<{ from: string; offer: RTCSessionDescriptionInit } | null>(null);
  private peerConnection: RTCPeerConnection | null = null;
  public incomingCall$ = this.incomingCallSubject.asObservable();
  public roomId: string | null = null;
  private customerId: string = '';
  private messageCallSubject = new BehaviorSubject<string | null>(null);

  public messageCall$ = this.messageCallSubject.asObservable();

  constructor(
    private socketservice: SocketService,
    private videoCallService: VideoCallService,
    private store: Store,
  ) {

    this.store.select(isLoggedIn).subscribe(islogged => {
      if (islogged) {
        this.socket = this.socketservice.getSocket();
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
        this.socketservice?.emit('candidate', { roomId: this.roomId, candidate });
      }
    };

    return peerConnection;
  }

  private initializeSocketListeners(): void {

    this.socket?.on('incoming_call',async (data: { from: string; offer: RTCSessionDescriptionInit; roomId: string }) => {
      this.roomId = data.roomId;
      this.customerId = data.from;
      this.incomingCallSubject.next(data);
    });

    this.socket?.on('receive-offer', async (data: { offer: RTCSessionDescriptionInit; roomId: string }) => {
      this.roomId = data.roomId;
    });

    this.socket?.on('receive-candidate', async (data: { candidate: RTCIceCandidateInit | undefined }) => {
      if (data.candidate) {
        await this.handleCandidate(data.candidate);
      }
    });

    this.socket?.on('callEnded', async (data: { roomId: string }) => {
      this.messageCallSubject.next('Call Ended!');
      this.incomingCallSubject.next(null);
    });
  }

  private async handleOffer(offer: RTCSessionDescriptionInit, customerId: string): Promise<void> {
    try {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        this.customerId = customerId;
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        // Add this line
        this.socket?.emit('answer', { roomId: this.roomId, answer, customerId });
      }
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  private async handleCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    try {
      if (this.peerConnection && this.peerConnection.remoteDescription) {
        await this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
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

  public async acceptCall(): Promise<void> {
    try {
      const incomingCallData = this.incomingCallSubject.value;
      if (!incomingCallData) return;

      // Step 1: Join the call to get the roomId
      const response = await firstValueFrom(this.videoCallService.joinCall(this.roomId!));
      this.roomId = response.data.roomId;
      await this.initializeLocalStream();
      await this.handleOffer(incomingCallData.offer, incomingCallData.from);
      this.incomingCallSubject.next(null);
    } catch (error) {
      console.error('Error accepting call:', error);
    }
  }

  public rejectCall(): void {;
    this.socket?.emit('call-rejected', { roomId: this.roomId, customerId: this.customerId});
    this.clearCallData();
  }

  public endCall() {
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
            console.log("ending call vendor", this.roomId)
            this.socketservice.emit('end-call', { roomId: this.roomId });
          }
      }
      this.clearCallData();
      this.roomId = null;
      this.customerId = '';
    }
  }

  private clearCallData(): void {
    this.localStreamSubject.next(null);
    this.remoteStreamSubject.next(null);
    this.incomingCallSubject.next(null);
    this.peerConnection = this.createPeerConnection();
  }

  public toggleAudio(): void {
    const stream = this.localStreamSubject.getValue();
    if (stream) {
      stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    }
  }

  public toggleVideo(): void {
    const stream = this.localStreamSubject.getValue();
    if (stream) {
      stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
    }
  }

  public getRemoteStreamObservable(): Observable<MediaStream | null> {
    return this.remoteStreamSubject.asObservable();
  }

  public getLocalStreamObservable(): Observable<MediaStream | null> {
    return this.localStreamSubject.asObservable();
  }


  public getMessageClear(){
    return this.messageCallSubject.next(null);
  }

  public ngOnDestroy(): void {
    console.log('Service destroyed');
    this.endCall();
  }
}
