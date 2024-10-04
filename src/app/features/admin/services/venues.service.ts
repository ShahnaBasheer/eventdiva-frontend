

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable()


export class VenuesAdminService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.adminUrl}/venues`;


    getVenuesPage(page: number, limit: number): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            params: {
              page: page.toString(), limit: limit.toString()
            },
            withCredentials: true,
        });
    }

    getVenueBookings(page: number, limit: number): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
          params: {
            page: page.toString(), limit: limit.toString()
          },
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
