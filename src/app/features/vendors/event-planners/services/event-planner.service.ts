import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})


export class EventPlannerService {
  private _eventServicesOptions = [
        { name: "Wedding Events", selected: false },{ name: "Corporate Events", selected: false },
        { name: "Social Events", selected: false },{ name: "Themed Parties", selected: false },
        { name: "Destination Events", selected: false },{ name: "Festivals", selected: false },
        { name: "Concerts and Live Performances", selected: false },{ name: "Trade Shows and Exhibitions", selected: false },
        { name: "Fundraisers and Charity Events", selected: false },{ name: "Conferences and Seminars", selected: false },
        { name: "Product Launches", selected: false },{ name: "Award Ceremonies", selected: false },
        { name: "Birthday Parties", selected: false },{ name: "Anniversaries", selected: false },
        { name: "Sporting Events", selected: false },{ name: "Community Events", selected: false },
        { name: "School and University Events", selected: false },{ name: "Religious Celebrations", selected: false },
        { name: "Holiday Parties", selected: false },{ name: "General Event Planning", selected: false }
    ];

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.vendorUrl}/event-planner`

    getDashboard(){
      return this.http.get<any>(`${this.APIBASE_URL}/dashboard`, {
        withCredentials: true,
      })
    }

    getEventServices(){
       return this._eventServicesOptions;
    }

    submitEventPlannerForm(formData: any) {
      return this.http.post<any>(`${this.APIBASE_URL}/planner-register/`, formData, {
        withCredentials: true,
      })
    }

    getEventPlanner(){
      return this.http.get<any>(`${this.APIBASE_URL}/service/`, {
         withCredentials: true,
      })
    }

    getAvailabilityInfo(){
      return this.http.get<any>(`${this.APIBASE_URL}/calendar/`, {
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
