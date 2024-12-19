import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, Pipe } from '@angular/core';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUser } from '../../../../features/customer/store/customer.selectors';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Message } from '../../../../core/models/chatroom.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})


export class ChatRoomComponent implements OnInit{
  @Output() hideChatRoomModal = new EventEmitter<boolean>();
  @ViewChildren('lastMessage') lastMessages!: QueryList<ElementRef<HTMLElement>>;
  AllMessages: Message[] = [];
  @Input({ required: true }) remoteId!: string;
  newmessage: string = '';
  user: string = '';
  @Input({required: true}) title: string | null = null;
  showChatRoomModal = false;
  private initialScrollDone = false; // Flag to ensure smooth initial scroll
  private isMarkingRead = false; // Prevent redundant marking while processing
  private subscriptions = new Subscription();


  constructor(
     private chatroomservice: ChatRoomService,
     private store: Store,
     private cdr: ChangeDetectorRef){
  }

  onCloseModal() {
    this.hideChatRoomModal.emit();
  }


  ngOnInit(): void {
      this.store.select(getUser)
      .pipe(distinctUntilChanged())
      .subscribe(user => {
        this.user = user?.firstName + ' ' + user?.lastName || '';
      })

      this.subscriptions.add(this.chatroomservice.chatMessages$.subscribe( messages => {
        this.AllMessages = messages;
        this.showChatRoomModal = true;
        this.cdr.detectChanges();
        this.scrollToLastMessage();
        this.markVisibleMessagesAsRead();
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


  async sendMessage(){
      if(this.newmessage){
        await this.chatroomservice.sendMessage(this.newmessage, this.user);
        this.newmessage = '';
        if (this.lastMessages.last) {
          this.lastMessages.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
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
      if (!messageElement || message?.senderType !== environment.vendor) continue;
      if (message.isRead) break;
      if (
        message?.senderType === environment.vendor && // Only process customer-sent messages
        this.isElementVisible(messageElement) // Check visibility
      ) {
        unreadMessages.push(message?._id!);
        message.isRead = true;
      }
    }

    // Make a single API call to mark all collected unread messages
    if (unreadMessages.length > 0) {
      this.chatroomservice.markMessageAsRead(unreadMessages, environment.customerUrl)
        .subscribe({
          next: () => console.log(`Messages marked as read: ${unreadMessages}`),
          error: (err) => console.error(`Failed to mark messages: ${err.message}`),
          complete: () => (this.isMarkingRead = false),
        });
    } else this.isMarkingRead = false;

  }

  isElementVisible(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe to avoid memory leaks
    this.chatroomservice.leaveChatRoom(environment.customer);
  }
}
