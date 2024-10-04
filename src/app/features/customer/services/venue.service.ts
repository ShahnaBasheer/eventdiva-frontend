

import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";



@Injectable()

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

  // Create an observable to hold the current filters
  private venuefiltersSubject = new BehaviorSubject<{
    services: [],
    amenities: [],
    venueTypes: [],
    location: ''
  }>({
    services: [],
    amenities: [],
    venueTypes: [],
    location: ''
  });

  venuefilters$ = this.venuefiltersSubject.asObservable();


  APIBASE_VENUES_URL = `${environment.customerUrl}/vendors/venues`;
  APIBASE_BOOKING_URL =  `${environment.customerUrl}/bookings/venue`;

  constructor(private http: HttpClient){}

  getServices(){
    return this._services;
  }

  // Method to update the filters
  updateFilters(newFilters: any) {
    this.venuefiltersSubject.next(newFilters); // Emit the new filters
  }

  // Method to get the current filters' value
  getFilters() {
    return this.venuefiltersSubject.value;
  }


  getVenueDetails(slug: string){
      return this.http.get<any>(`${this.APIBASE_VENUES_URL}/${slug}`, {
        withCredentials: true,
      })
  }

  getVenueBookingPage(slug: string){
      return this.http.get<any>(`${this.APIBASE_VENUES_URL}/booking/${slug}`, {
        withCredentials: true,
      })
  }

  submitVenueBookingForm(formData: any, slug: string){
    return this.http.post<any>(`${this.APIBASE_VENUES_URL}/booking/payment/${slug}`, formData, {
        withCredentials: true,
    })
  }

  confirmRazorpayPayment(razorData: any){
    return this.http.post<any>(`${this.APIBASE_VENUES_URL}/booking/razorpay`, razorData, {
      withCredentials: true,
    })
  }

  checkAvailability(formData: any, vendorId: string){
    return this.http.post<any>(`${environment.customerUrl}/venues/check-availability/${vendorId}`, formData, {
      withCredentials: true,
    })
  }

  bookingDetails(bookingId: string){
    return this.http.get<any>(`${this. APIBASE_BOOKING_URL}/details/${bookingId}`, {
      withCredentials: true,
    })
  }

  payAdvancepayment(bookingId: string){
    return this.http.get<any>(`${this. APIBASE_BOOKING_URL}/advancepayment/${bookingId}`, {
      withCredentials: true,
    })
  }

  payFullpayment(bookingId: string){
    return this.http.get<any>(`${this. APIBASE_BOOKING_URL}/fullpayment/${bookingId}`, {
      withCredentials: true,
    })
  }
}
