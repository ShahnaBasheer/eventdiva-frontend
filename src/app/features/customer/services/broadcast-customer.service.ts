// src/app/services/broadcast-channel.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CustomerBroadcastChannelService {
  private channel: BroadcastChannel;
  private customerSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.channel = new BroadcastChannel('customer-channel');

    // Listen for messages from other tabs
    this.channel.onmessage = (event) => {
      this.customerSubject.next(event.data);
    };
  }

  // Send a message to other tabs
  sendMessage(message: any) {
    console.log("i am from brodcast customer sevrice")
    this.channel.postMessage(message);
  }

  // Observable for message changes
  get messages$() {
    return this.customerSubject.asObservable();
  }
}
