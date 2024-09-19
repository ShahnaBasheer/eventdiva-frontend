

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root',
})


export class VenuesAdminService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = 'http://localhost:2000/admin/venues'


    getVenuesPage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            withCredentials: true,
        });
    }

    getVenueBookings(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
          withCredentials: true,
        });
    }

    getVenueDetails(slug: string): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/details/${slug}`, {
          withCredentials: true,
        });
    }

    venueStatusChange(slug: string, status: string): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/${slug}/${status}`, {
          withCredentials: true,
        });
    }


}
