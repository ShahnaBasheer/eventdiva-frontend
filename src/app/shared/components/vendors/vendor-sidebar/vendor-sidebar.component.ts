import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../../../features/vendors/services/common.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReplaceCharacterPipe } from '../../../../core/pipes/replace.pipe';
import { ChatRoomService } from '../../../../core/services/chatRoom.service';

@Component({
  selector: 'app-vendor-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReplaceCharacterPipe
  ],
  templateUrl: './vendor-sidebar.component.html',
  styleUrl: './vendor-sidebar.component.css'
})


export class VendorSidebarComponent implements OnInit{
  menuItems: any = [];
  isNewMessage = false;
  @Input({ required: true }) vendorType = '';

  constructor(
    private commonService: CommonService,
    private chatroomService: ChatRoomService){

  }

  ngOnInit(): void {

      this.chatroomService.checkUnreadMessagesAPI('vendor').subscribe({
          next: (res) => {
              this.chatroomService.updateNotifyMessage(!!res.data.count);
          }
      })

      this.chatroomService.notifyMessageSubject$.subscribe(data => {
          this.isNewMessage = data;
      });

      this.menuItems = this.commonService.getMenue();

  }

}
