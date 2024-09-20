
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root',
})


export class CommonService {
    private _menu = [
      { "name": "Dashboard", "route": "dashboard" },
      { "name": "Profile", "route": "profile"},
      { "name": "Service", "route": "service"},
      { "name": "Bookings", "route": "bookings"},
      { "name": "Calendar", "route": "calendar"},
      { "name": "Chat Room", "route": "chat-room"},
      { "name": "About", "route": "about"},
      { "name": "Contact", "route": "contact"},
    ]

    constructor(
      private http: HttpClient){}

    getMenue(){
      return this._menu;
    }

    getProfilePage(){
        return this.http.get<any>(`${environment.vendorUrl}/profile`, {
          withCredentials: true
        })
    }

    updateProfile(profileData: any): Observable<any> {
      return this.http.patch(`${environment.vendorUrl}/profile/update`, profileData);
    }

    sendOtpForEmail(email: string):Observable<any>{
      return this.http.patch(`${environment.vendorUrl}/profile/email`, { email });
    }

    verifyOTPForEmail(formValue: any):Observable<any>{
      return this.http.patch(`${environment.vendorUrl}/profile/email-update`, { formValue });
    }

    passwordChange(formValue: any){
      return this.http.patch(`${environment.vendorUrl}/profile/password-change`, { formValue });
    }
}
