import { ChatRoomService } from './../../../../core/services/chatRoom.service';
import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Message } from '../../../../core/models/chatroom.model';
import { Store } from '@ngrx/store';
import { Customer } from '../../../../core/models/customer.model';
import { FormsModule } from '@angular/forms';
import { getUser } from '../../../../features/vendors/store/vendor.selectors';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})


export class MessagesComponent {
  vendor: string = '';
  vendorType: string = '';
  @ViewChildren('lastMessage') lastMessages!: QueryList<ElementRef<HTMLElement>>;
  AllMessages: Message[] = [];
  newmessage: string = '';
  serviceName: string = '';
  @Input({required: true}) user!: Customer;
  private subscriptions = new Subscription();


  constructor(
    private store: Store,
    private chatroomservice: ChatRoomService,
    private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.store.select(getUser).subscribe(user => {
      if(user){
        this.vendor = user?.firstName?.charAt(0) + user?.lastName?.charAt(0);
        this.serviceName = user?.serviceName || '';
      }
    })


    this.subscriptions.add(this.chatroomservice.chatMessages$.subscribe( messages => {
      this.AllMessages = messages;
      this.cdr.detectChanges();
    }))
  }

  ngAfterViewInit() {
    if(this.lastMessages.last){
      this.lastMessages.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    this.lastMessages.changes.subscribe(() => {
      if (this.lastMessages.last) {
        this.lastMessages.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });

  }

  ngAfterViewChecked(): void {
    // Check if the message is visible and mark it as read
    // this.lastMessages.forEach((element, index) => {
    //   const message = this.AllMessages[index];
    //   if (!message.isRead && this.isElementVisible(element.nativeElement)) {
    //     console.log(message.id,"heyy message id")
    //     // this.markMessageAsRead(message.id);
    //   }
    // });
  }

  isElementVisible(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  markMessageAsRead(messageId: string): void {
    this.chatroomservice.markMessageAsRead(messageId).subscribe(() => {
      console.log(`Message ${messageId} marked as read.`);
    });
  }

  async sendMessage(){
    if(this.newmessage){
      await this.chatroomservice.sendMessage(this.newmessage, this.serviceName);
      this.newmessage = '';
      if (this.lastMessages.last) {
        this.lastMessages.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  ngDestroy(){
    this.subscriptions.unsubscribe();
  }
}
