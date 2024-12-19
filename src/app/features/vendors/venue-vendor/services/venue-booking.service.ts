import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})


export class VenueBookingService {

    constructor(private http: HttpClient){}

    APIBASE_URL = `${environment.vendorUrl}/venue-vendor/bookings`

    getAllVenueBookings(page: number, limit:number,
      status: string,
      filters: {
      selectedMonth: number | null;
      selectedYear: number | null;
      selectedEventType: string | null;
      selectedDays: string | null;
    }){
      return this.http.get<any>(`${this.APIBASE_URL}/`, {
        params: {
          page: page.toString(),
          limit: limit.toString(),
          status: status.toString() ,
          selectedMonth: filters.selectedMonth?.toString() || '',
          selectedYear: filters.selectedYear?.toString() || '',
          selectedEventType: filters.selectedEventType || '',
          selectedDays: filters.selectedDays || '',
        },
        withCredentials: true,
      })
    }

    getVenueBookingDetail(bookingId: string){
      return this.http.get<any>(`${this.APIBASE_URL}/details/${bookingId}`, {
        withCredentials: true,
      })
    }

    statusChange(bookingId: string, status: string){
      return this.http.patch<any>(`${this.APIBASE_URL}/details/${bookingId}/change-status/`, {status}, {
        withCredentials: true,
      });
    }

    sendAdvancePayment(formValue: {bookingId: string, advancePayment: number}){
      return this.http.patch<any>(`${this.APIBASE_URL}/advance-payment/`, { formValue }, {
        withCredentials: true,
      });
    }


    generateFullPayment(fullPaymentCharges: {
      venueRental: number;
      charges: { chargeName: string, amount: number}[] },
      bookingId: string){
      return this.http.patch<any>(`${this.APIBASE_URL}/full-payment/`, { fullPaymentCharges, bookingId }, {
        withCredentials: true,
      });
    }

  }
