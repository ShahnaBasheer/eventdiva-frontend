import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  APIBASE_URL = `${environment.customerUrl}`;

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
      withCredentials: true,
    });
  }

  getContactPage(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/contact`, {
      withCredentials: true,
    });
  }

  getAboutPage(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/about`, {
      withCredentials: true,
    });
  }

  getProfilePage() {
    return this.http.get<any>(`${this.APIBASE_URL}/profile`, {
      withCredentials: true,
    });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.patch(
      `${this.APIBASE_URL}/profile/update`,
      profileData
    );
  }

  sendOtpForEmail(email: string): Observable<any> {
    return this.http.patch(`${this.APIBASE_URL}/profile/email`, { email });
  }

  verifyOTPForEmail(formValue: any): Observable<any> {
    return this.http.patch(`${this.APIBASE_URL}/profile/email-update`, {
      formValue,
    });
  }

  passwordChange(formValue: any) {
    return this.http.patch(`${this.APIBASE_URL}/profile/password-change`, {
      formValue,
    });
  }
}
