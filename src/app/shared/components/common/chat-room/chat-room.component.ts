import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUser } from '../../../../features/customer/store/customer.selectors';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';

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
  AllMessages: any = [];
  @Input({ required: true }) remoteId!: string;
  newmessage: string = '';
  user: string = '';
  @Input({required: true}) title: string | null = null;
  showChatRoomModal = false;
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
      this.store.select(getUser).subscribe(user => {
        this.user = user?.firstName + ' ' + user?.lastName || '';
      })

      this.subscriptions.add(this.chatroomservice.chatMessages$.subscribe( messages => {
        this.AllMessages = messages;
        // Trigger change detection
        this.cdr.detectChanges();
        this.showChatRoomModal = true;
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe to avoid memory leaks
  }
}
