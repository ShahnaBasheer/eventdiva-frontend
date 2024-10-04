import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable()


export class AllVendorsService {

    constructor(private http: HttpClient){}

    getAllEventPlannersPage(page: number,
      limit: number,
      filters: {
        services: string[],
        location: string
      },
      search: string
    ): Observable<any>{
        // Initialize HttpParams
        let params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('location', filters.location || '')
        .set('search', search.toString());

        // Append arrays as individual query params
        filters.services.forEach(service => {
          params = params.append('services', service);
        });

        return this.http.get<any>(`${environment.customerUrl}/vendors/event-planners`, {
            withCredentials: true,
        })
    }

    getAllVenuesPage(
      page: number,
      limit: number,
      filters: {
        services: string[],
        amenities: string[],
        venueTypes: string[],
        location: string
      },
      search: string
    ): Observable<any> {
      // Initialize HttpParams
      let params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('location', filters.location || '')
        .set('search', search.toString() || '');

        // Append arrays as individual query params
        filters.services.forEach(service => { params = params.append('services', service);});
        filters.amenities.forEach(amenity => { params = params.append('amenities', amenity); });
        filters.venueTypes.forEach(type => { params = params.append('venueTypes', type);});

        return this.http.get<any>(`${environment.customerUrl}/vendors/venues`, {
          params: params,
          withCredentials: true,
        });
    }

}
