import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";


@Injectable()



export class PlannerService {

  APIBASE_URL =  `${environment.baseUrl}/vendors/event-planners`

  constructor(private http: HttpClient){}

  getEventPlanner(slug: string){
      return this.http.get<any>(`${this.APIBASE_URL}/${slug}`, {
        withCredentials: true,
      })
  }

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
    return this.http.post<any>(`${environment.baseUrl}/event-planners/booking/payment/${slug}`, formData, {
        withCredentials: true,
    })
  }

  confirmRazorpayPayment(razorData: any){
    return this.http.post<any>(`${environment.baseUrl}/event-planners/booking/razorpay`, razorData, {
      withCredentials: true,
    })
  }

  checkAvailability(formData: any, vendorId: string){
    return this.http.post<any>(`${environment.baseUrl}/event-planners/check-availability/${vendorId}`, formData, {
      withCredentials: true,
    })
  }

  bookingDetails(bookingId: string){
    return this.http.get<any>(`${environment.baseUrl}/bookings/event-planner/details/${bookingId}`, {
      withCredentials: true,
    })
  }

  payAdvancepayment(bookingId: string){
    return this.http.get<any>(`${environment.baseUrl}/bookings/event-planner/advancepayment/${bookingId}`, {
      withCredentials: true,
    })
  }

  payFullpayment(bookingId: string){
    return this.http.get<any>(`${environment.baseUrl}/bookings/event-planner/fullpayment/${bookingId}`, {
      withCredentials: true,
    })
  }

}
