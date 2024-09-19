

// src/app/services/broadcast-channel.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VendorBroadcastChannelService {
  private channel: BroadcastChannel;
  private vendorSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.channel = new BroadcastChannel('vendor-channel');

    // Listen for messages from other tabs
    this.channel.onmessage = (event) => {
      this.vendorSubject.next(event.data);
    };
  }

  // Send a message to other tabs
  sendMessage(message: any) {
    this.channel.postMessage(message);
  }

  // Observable for message changes
  get messages$() {
    return this.vendorSubject.asObservable();
  }
}
