import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { VenueVendorService } from '../../venue-vendor/services/venue-vendor.service';
import { Chatroom, Message } from '../../../../core/models/chatroom.model';
import { MessagesComponent } from "../../../../shared/components/common/messages/messages.component";
import { Customer } from '../../../../core/models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-inbox-chat',
  standalone: true,
  imports: [CommonModule, MessagesComponent],
  templateUrl: './inbox-chat.component.html',
  styleUrl: './inbox-chat.component.css'
})


export class InboxChatComponent implements OnInit{
  chatroom!: Chatroom;
  AllCustomers: Chatroom[] = [];

  constructor(
    private chatroomservice: ChatRoomService,
    private venuevendorservice: VenueVendorService,
    private toastr: ToastrService,
  ){}


  ngOnInit(): void {
    this.venuevendorservice.getChatroom().subscribe({
      next: (res)=> {
         this.AllCustomers = res.data.allchats;
      },
      error: (error) =>{
         console.log("ehy", error)
      }
    })

  }

  async onSelectCustomer(index: number){
    // If there's a current chatroom, leave it before joining a new one
    if (this.chatroom?._id) {
      console.log(this.chatroom?._id, "leaving room")
      await this.chatroomservice.leaveChatRoom(environment.vendor);
    }

    this.chatroom = this.AllCustomers[index];
    if(this.chatroom.customerId._id){
      console.log(this.chatroom.customerId._id, "joinchatroom");
      this.chatroomservice.joinChatRoom(this.chatroom.customerId._id)
    } else {
      this.toastr.error('Something Went Wrong! Please try again Later!');
    }

  }
}
