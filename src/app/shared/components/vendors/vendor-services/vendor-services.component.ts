import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-vendor-services',
  standalone: true,
  imports: [],
  templateUrl: './vendor-services.component.html',
  styleUrl: './vendor-services.component.css'
})


export class VendorServicesComponent implements OnInit{

  @Input() vendor: string = '';
  addText: string = '';
  urlPath: string = '';


  constructor(
    private router: Router){}

  ngOnInit(): void {
    switch (this.vendor) {
      case 'EP':
        this.addText = 'Event Management Company';
        this.urlPath = 'event-planner';
        break;
      case 'PY':
        this.addText = 'Photography';
        this.urlPath = 'photographer';
        break;
      case 'FV':
        this.addText = 'Food Service';
        this.urlPath = 'food-vendor';
        break;
      case 'VV':
        this.addText = 'Venue Service';
        this.urlPath = 'venue-vendor';
        break;
      default:
        this.addText = 'Service';
        break;
    }
  }

  onAddService(){
      return this.router.navigate([`/vendor/${this.urlPath}/add-service`]);
  }


}
