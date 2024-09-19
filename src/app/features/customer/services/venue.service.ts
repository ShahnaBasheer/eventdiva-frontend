

import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})

export class venueService {

  private _services = [
    { name: 'Catering', selected: false },
    { name: 'Decoration', selected: false },
    { name: 'Alcohol Services', selected: false },
    { name: 'Audio/Visual Equipment', selected: false },
    { name: 'Event Planning', selected: false },
    { name: 'Photography', selected: false },
    { name: 'Videography', selected: false },
    { name: 'Security', selected: false },
    { name: 'Transportation', selected: false },
    { name: 'Cleaning Services', selected: false },
    { name: 'On-Site Coordinator', selected: false },
    { name: 'Wi-Fi Access', selected: false },
    { name: 'Cake', selected: false },
    { name: 'Entertainment', selected: false },
    { name: 'Setup and Takedown', selected: false },
    { name: 'Furniture Rental', selected: false },
    { name: 'Custom Lighting', selected: false }
  ];


  APIBASE_URL =  `${environment.baseUrl}/vendors/venues`;

  constructor(private http: HttpClient){}

  getServices(){
    return this._services;
  }



  getVenueDetails(slug: string){
      return this.http.get<any>(`${this.APIBASE_URL}/${slug}`, {
        withCredentials: true,
      })
  }

  getVenueBookingPage(slug: string){
      return this.http.get<any>(`${this.APIBASE_URL}/booking/${slug}`, {
        withCredentials: true,
      })
  }

  submitVenueBookingForm(formData: any, slug: string){
    return this.http.post<any>(`${environment.baseUrl}/venues/booking/payment/${slug}`, formData, {
        withCredentials: true,
    })
  }

  confirmRazorpayPayment(razorData: any){
    return this.http.post<any>(`${environment.baseUrl}/venues/booking/razorpay`, razorData, {
      withCredentials: true,
    })
  }

  checkAvailability(formData: any, vendorId: string){
    return this.http.post<any>(`${environment.baseUrl}/venues/check-availability/${vendorId}`, formData, {
      withCredentials: true,
    })
  }
}
