

// src/app/services/broadcast-channel.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AdminBroadcastChannelService {
  private channel: BroadcastChannel;
  private adminSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.channel = new BroadcastChannel('admin-channel');
    this.channel.onmessage = (event) => {
      this.adminSubject.next(event.data);
    };
  }

  // Send a message to other tabs
  sendMessage(message: any) {
    this.channel.postMessage(message);
  }

  // Observable for message changes
  get messages$() {
    return this.adminSubject.asObservable();
  }
}
