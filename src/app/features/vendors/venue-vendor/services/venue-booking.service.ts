import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})


export class VenueBookingService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.vendorUrl}/venue-vendor`

    getVenueBookings(){
      return this.http.get<any>(`${this.APIBASE_URL}/bookings/`, {
        withCredentials: true,
      })
    }

    getVenueBookingDetail(bookingId: string){
      return this.http.get<any>(`${this.APIBASE_URL}/bookings/details/${bookingId}`, {
        withCredentials: true,
      })
    }

    statusChange(bookingId: string, status: string){
      return this.http.patch<any>(`${this.APIBASE_URL}/bookings/details/${bookingId}/change-status/`, {status}, {
        withCredentials: true,
      });
    }

    sendAdvancePayment(formValue: {bookingId: string, advancePayment: number}){
      return this.http.patch<any>(`${this.APIBASE_URL}/bookings/advance-payment/`, { formValue }, {
        withCredentials: true,
      });
    }

  }