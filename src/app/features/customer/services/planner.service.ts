import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject } from "rxjs";


@Injectable()



export class PlannerService {

  // Create an observable to hold the current filters
  private plannersfiltersSubject = new BehaviorSubject<{
    services: [],
    location: ''
  }>({ services: [], location: ''});

  plannerfilters$ = this.plannersfiltersSubject.asObservable();

  APIBASE_URL =  `${environment.customerUrl}/vendors/event-planners`;
  APIBASE_PLANNERS_URL = `${environment.customerUrl}/event-planners`;
  APIBASE_BOOKING_URL = `${environment.customerUrl}/bookings/event-planner`;


  constructor(private http: HttpClient){}

  // Method to update the filters
  updateFilters(newFilters: any) {
    this.plannersfiltersSubject.next(newFilters); // Emit the new filters
  }

  // Method to get the current filters' value
  getFilters() {
    return this.plannersfiltersSubject.value;
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
