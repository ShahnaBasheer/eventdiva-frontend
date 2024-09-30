import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})


export class VenueVendorService {
    private _venueTypes = [
      { value: 'Conference Center', label: 'Conference Center' },
      { value: 'Resort', label: 'Resort' },
      { value: 'Hotel', label: 'Hotel' },
      { value: 'Banquet Hall', label: 'Banquet Hall' },
      { value: 'Restaurant', label: 'Restaurant/Cafe' },
      { value: 'Community Center', label: 'Community Center' },
      { value: 'Auditorium', label: 'Auditorium' },
      { value: 'Convention Center', label: 'Convention Center' },
      { value: 'Outdoor Venue', label: 'Outdoor Venue' },
      { value: 'Corporate Office', label: 'Corporate Office' },
    ];

    private _amenities = [
      { name: 'Air Conditioning', selected: false },
      { name: 'Electricity', selected: false },
      { name: 'Heating', selected: false },
      { name: 'Garden', selected: false },
      { name: 'Dance Floor', selected: false },
      { name: 'Outdoor Seating', selected: false },
      { name: 'Smoking Area', selected: false },
      { name: 'Restrooms', selected: false },
      { name: 'Full Use of Kitchen', selected: false },
      { name: 'Microwave', selected: false },
      { name: 'Refrigerator Access', selected: false },
      { name: 'Ice Machine Access', selected: false },
      { name: 'Tables', selected: false },
      { name: 'Chairs', selected: false },
      { name: 'Stove', selected: false },
      { name: 'Oven', selected: false },
      { name: 'Sink', selected: false },
      { name: 'Parking Lot', selected: false },
      { name: 'Free Parking Garage', selected: false },
      { name: 'Open Area for Children', selected: false },
      { name: 'Playground', selected: false },
    ]

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

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.vendorUrl}/venue-vendor`

    getDashboard(){
      return this.http.get<any>(`${this.APIBASE_URL}/dashboard`, {
        withCredentials: true,
      })
    }

    getVenuTypes(){
       return this._venueTypes;
    }

    getAmenities(){
      return this._amenities;
    }

    getServices(){
      return this._services;
    }

    submitVenuForm(formData: any) {
      return this.http.post<any>(`${this.APIBASE_URL}/venue-register/`, formData, {
        withCredentials: true,
      })
    }

    getVenueDetails(){
      return this.http.get<any>(`${this.APIBASE_URL}/service/`, {
         withCredentials: true,
      })
    }

    getAvailabilityInfo(){
        return this.http.get<any>(`${this.APIBASE_URL}/calendar/`, {
          withCredentials: true,
        })
    }

    getChatroom(){
        return this.http.get<any>(`${environment.vendorUrl}/chat-room/`, {
          withCredentials: true,
        })
    }

    addHoliday(date: string) {
      return this.http.patch<any>(
        `${this.APIBASE_URL}/calendar/add-holiday/`,{ date },{ withCredentials: true }
      );
    }

    addNewEvent(formValue: any){
      return this.http.patch<any>(
        `${this.APIBASE_URL}/calendar/add-new-event/`,{ formValue },{ withCredentials: true }
      );
    }

  }
