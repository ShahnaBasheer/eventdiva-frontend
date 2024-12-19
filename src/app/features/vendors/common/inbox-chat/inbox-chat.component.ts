import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';
import { VenueVendorService } from '../../venue-vendor/services/venue-vendor.service';
import { MessagesComponent } from "../../../../shared/components/common/messages/messages.component";
import { ToastrAlertService } from '../../../../core/services/toastr.service';
import { environment } from '../../../../../environments/environment';
import { Customer } from '../../../../core/models/customer.model';
import { PageLoaderComponent } from '../../../../shared/components/common/page-loader/page-loader.component';


interface Chat {
  _id: string,
  customerId: Customer,
  unreadMessages: number
}


@Component({
  selector: 'app-inbox-chat',
  standalone: true,
  imports: [ CommonModule, MessagesComponent, PageLoaderComponent ],
  templateUrl: './inbox-chat.component.html',
  styleUrl: './inbox-chat.component.css'
})


export class InboxChatComponent implements OnInit{
  chatroom: Chat | null = null;
  isLoading: boolean = true;
  AllCustomers: Chat[] = [];

  constructor(
    private chatroomservice: ChatRoomService,
    private venuevendorservice: VenueVendorService,
    private toastr: ToastrAlertService,
  ){}


  ngOnInit(): void {
    this.venuevendorservice.getChatroom().subscribe({
      next: (res)=> {
         this.AllCustomers = res.data.chats;
         this.isLoading = false;
      },
      error: (error) =>{
         console.log("error occured during finding chats", error.message);
         this.isLoading = false;
         this.toastr.wrong();
      }
    })

  }

  async onSelectCustomer(index: number){
    try {
      this.isLoading = true;
      // If there's a current chatroom, leave it before joining a new one
      if (this.chatroom?._id) {
        const result = await this.chatroomservice.leaveChatRoom(environment.vendor);
        console.log(result, "leave room");

        if(result === 'success')this.chatroom = null;  // Reset the current chatroom
      }

      // Select the customer based on the index
      const selectCustomer = this.AllCustomers[index];

      // Check if the selected customer has a valid _id
      if (selectCustomer?.customerId?._id) {
        const result = await this.chatroomservice.joinChatRoom(selectCustomer.customerId._id);
        console.log(result,"join room");
        if (result === 'success') {
          this.chatroom = selectCustomer; // Update the chatroom if successful
          this.AllCustomers[index].unreadMessages = 0;
        } else {
          this.toastr.wrong() // Show error message
        }
      } else {
        this.toastr.wrong(); // Show error if no valid customer ID
      }
    } catch (error) {
      this.toastr.error('An unexpected error occurred. Please try again later.');
    } finally {
      this.isLoading = false;
    }

  }
}
