import { ChatRoomService } from './../../../../core/services/chatRoom.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import { Message } from '../../../../core/models/chatroom.model';
import { Store } from '@ngrx/store';
import { Customer } from '../../../../core/models/customer.model';
import { FormsModule } from '@angular/forms';
import { getUser } from '../../../../features/vendors/store/vendor.selectors';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  vendor: string = '';
  vendorType: string = '';
  @ViewChildren('lastMessage') lastMessages!: QueryList<
    ElementRef<HTMLElement>
  >;
  AllMessages: Message[] = [];
  newmessage: string = '';
  serviceName: string = '';
  @Input({ required: true }) user!: Customer;
  private subscriptions = new Subscription();
  private initialScrollDone = false; // Flag to ensure smooth initial scroll
  private isMarkingRead = false; // Prevent redundant marking while processing

  constructor(
    private store: Store,
    private chatroomservice: ChatRoomService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log("hello guys");

    this.store.select(getUser).subscribe((user) => {
      if (user) {
        this.vendor = user?.firstName?.charAt(0) + user?.lastName?.charAt(0);
        this.serviceName = user?.serviceName || '';
      }
    });

    this.subscriptions.add(
      this.chatroomservice.chatMessages$.subscribe((messages) => {
        this.AllMessages = messages;
        this.cdr.detectChanges();
        this.scrollToLastMessage();
        this.markVisibleMessagesAsRead();
      })
    );

  }

  ngAfterViewInit() {
    this.lastMessages.changes
    .subscribe(() => {
      console.log("it triggers in afterview");
      this.scrollToLastMessage();
      this.markVisibleMessagesAsRead();
    });
  }

  isElementVisible(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  async sendMessage() {
    if (this.newmessage) {
      await this.chatroomservice.sendMessage(this.newmessage, this.serviceName);
      this.newmessage = '';
      if (this.lastMessages.last) {
        this.lastMessages.last.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }

  scrollToLastMessage(): void {
    if (this.lastMessages?.last) {
      // Perform a smooth scroll only for the first load
      const scrollBehavior = this.initialScrollDone ? 'smooth' : 'auto';
      this.lastMessages.last.nativeElement.scrollIntoView({
        behavior: scrollBehavior,
      });
      this.initialScrollDone = true;
    }
  }

  markVisibleMessagesAsRead(): void {
    if (this.isMarkingRead) return;
    this.isMarkingRead = true;

    const unreadMessages: string[] = [];
    // Start from the last message and move backward
    for (let i = this.AllMessages.length - 1; i >= 0; i--) {
      const message = this.AllMessages[i];

      const messageElement = this.lastMessages.get(i)?.nativeElement;
      if (!messageElement || message?.senderType !== environment.customer) continue;
      if (message.isRead) break;
      if (
        message?.senderType === environment.customer && // Only process customer-sent messages
        this.isElementVisible(messageElement) // Check visibility
      ) {
        unreadMessages.push(message?._id!);
        message.isRead = true;
      }
    }

    // Make a single API call to mark all collected unread messages
    if (unreadMessages.length > 0) {
      this.chatroomservice.markMessageAsRead(unreadMessages, environment.vendorUrl)
        .subscribe({
          next: () => console.log(`Messages marked as read: ${unreadMessages}`),
          error: (err) => console.error(`Failed to mark messages: ${err.message}`),
          complete: () => (this.isMarkingRead = false),
        });
    } else this.isMarkingRead = false;

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
