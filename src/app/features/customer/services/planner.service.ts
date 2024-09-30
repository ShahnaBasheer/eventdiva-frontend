import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";


@Injectable()



export class PlannerService {

  APIBASE_URL =  `${environment.customerUrl}/vendors/event-planners`;
  APIBASE_PLANNERS_URL = `${environment.customerUrl}/event-planners`;
  APIBASE_BOOKING_URL = `${environment.customerUrl}/bookings/event-planner`;


  constructor(private http: HttpClient){}


  getEventPlannerDetails(slug: string){
    return this.http.get<any>(`${this.APIBASE_URL}/${slug}`, {
      withCredentials: true,
    })
  }

  getPlannerBookingPage(slug: string){
      return this.http.get<any>(`${this.APIBASE_URL}/booking/${slug}`, {
        withCredentials: true,
      })
  }

  submitPlannerBookingForm(formData: any, slug: string){
    return this.http.post<any>(`${this.APIBASE_PLANNERS_URL}/booking/payment/${slug}`, formData, {
        withCredentials: true,
    })
  }

  confirmRazorpayPayment(razorData: any){
    return this.http.post<any>(`${this.APIBASE_PLANNERS_URL}/booking/razorpay`, razorData, {
      withCredentials: true,
    })
  }

  checkAvailability(formData: any, vendorId: string){
    return this.http.post<any>(`${this.APIBASE_PLANNERS_URL}/check-availability/${vendorId}`, formData, {
      withCredentials: true,
    })
  }

  bookingDetails(bookingId: string){
    return this.http.get<any>(`${this.APIBASE_BOOKING_URL}/details/${bookingId}`, {
      withCredentials: true,
    })
  }

  payAdvancepayment(bookingId: string){
    return this.http.get<any>(`${this.APIBASE_BOOKING_URL}/advancepayment/${bookingId}`, {
      withCredentials: true,
    })
  }

  payFullpayment(bookingId: string){
    return this.http.get<any>(`${this.APIBASE_BOOKING_URL}/fullpayment/${bookingId}`, {
      withCredentials: true,
    })
  }

}
