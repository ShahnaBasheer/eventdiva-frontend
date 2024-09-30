import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import  MenuItem  from './nav.interface';
import { Store } from '@ngrx/store';
import { getUser, isLoggedIn } from '../../../../features/customer/store/customer.selectors';
import { logOut } from '../../../../features/customer/store/customer.actions';
import { NotificationsComponent } from '../notifications/notifications.component';




@Component({
  selector: 'app-navbar-customer',
  standalone: true,
  imports: [CommonModule, RouterModule,NotificationsComponent],
  templateUrl: './navbar-customer.component.html',
  styleUrl: './navbar-customer.component.css'
})


export class NavbarCustomerComponent{
  AllNotifications!: Notification[];
  showNotifications = false;
  isUserLoggedIn = false;
  firstname = '';
  isLogged = false;

  constructor(private store: Store){}


  menuItems: MenuItem[] = [
    { "name": "home", "route": "/home" },
    { "name": "vendors", "route": "/vendors",
      "subItems": [
        { "name": "Event Planners", "route": "/vendors/event-planners"},
        { "name": "Venues", "route": "/vendors/venues"},
      ]
    },
    { "name": "bookings", "route": "/bookings" },
    // { "name": "favourites", "route": "/favourites" },
    { "name": "contact", "route": "/contact" },
    { "name": "about", "route": "/about" }
  ]

  ngOnInit(): void {
    this.store.select(getUser).subscribe(user => {
        if(user){
          this.firstname = user?.firstName || '';
        }
    });

    this.store.select(isLoggedIn).subscribe(isLoggedIn => {
        if(isLoggedIn){
            this.isLogged = true;
        } else {
            this.isLogged = false;
        }
    })

  }

  onLogout() {
    this.store.dispatch(logOut());
  }

}




// { "name": "venues", "route": "/vendors/venues",
//   "subItems": [
//         { "name": "Banquet Halls", "route": "/vendors"},
//         { "name": "Auditorium", "route": "/vendors"},
//         { "name": "Resorts", "route": "/vendors"},
//         { "name": "4 Star & Above Wedding Hotels", "route": "/vendors"},
//         { "name": "3 Star Hotels with Banquets", "route": "/vendors"},
//         { "name": "Party Restaurant", "route": "/vendors"},
//         { "name": "Party Halls", "route": "/vendors"},
//         { "name": "Convention Centers", "route": "/vendors"},


//   ] },



// [
//   { "name": "home", "route": "/home" },
//   { "name": "vendors", "route": "/vendors", "subMenu": [
//           { "type": "Planners",
//             "list": [
//                 { "name": "Event Planners", "route": "/vendors/event-planners"},
//                 { "name": "vendors", "route": "/vendors"},
//                 { "name": "vendors", "route": "/vendors"},
//              ]
//           },
//           { "type": "Venues",
//             "list": [
//               { "name": "Banquet Halls", "route": "/vendors/venues"},
//               { "name": "Auditorium", "route": "/vendors/venues"},
//               { "name": "Resorts", "route": "/vendors/venues"},
//               { "name": "Hotels", "route": "/vendors/venues"},
//               { "name": "Restaurant", "route": "/vendors/venues"},
//               { "name": "Halls", "route": "/vendors"},
//               { "name": "Convention Centers", "route": "/vendors/venues"},
//              ]
//           },
//           { "type": "Food Vendors",
//             "list": [
//                 { "name": "vendors", "route": "/vendors"},
//                 { "name": "vendors", "route": "/vendors"},
//                 { "name": "vendors", "route": "/vendors"},
//              ]
//           },
//       ] },
//   { "name": "bookings", "route": "/bookings" },
//   { "name": "favourites", "route": "/favourites" },
//   { "name": "contact", "route": "/contact" },
//   { "name": "about", "route": "/about" }
// ]
