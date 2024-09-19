import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { isFieldInvalid } from '../../../../core/validators/forms.validator';
import { HttpClient } from '@angular/common/http';
import { AddressService } from '../../../../core/services/address.service';



@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})


export class AddressFormComponent implements OnInit{
  @Input({required: true}) addressFormGroup!: FormGroup;

  indianStatesAndUTs = this.addressservice.getIndianStates();
  addressInfo = this.addressservice.getAddressFields();
  filteredCities: string[] = [];
  showSuggestions: boolean = false;

  constructor(private http: HttpClient, private addressservice: AddressService) {}

  ngOnInit(): void {
    // const cityControl = this.addressFormGroup.get('city');
    // if (cityControl) {
    //   cityControl.valueChanges.pipe(
    //     distinctUntilChanged(),
    //     switchMap(value => {
    //       if (!value.trim()) {
    //         this.filteredCities = [];
    //         return of([]);
    //       }
    //       return this._searchCities(value);
    //     }),
    //     catchError(error => {
    //       console.error('Error fetching cities:', error);
    //       return of([]);
    //     })
    //   ).subscribe(cities => {
    //     this.filteredCities = cities;
    //   });
    // }
  }

  selectCity(city: string): void {
    const cityControl = this.addressFormGroup.get('city');

    if (cityControl) {
      this.filteredCities = [];
      cityControl.setValue(city);
    }
  }

  isFieldError(fieldgroup: string, fieldName: string): boolean | undefined{
    return isFieldInvalid(this.addressFormGroup, `${fieldName}`);
  }

  isFieldRequired(fieldgroup: string, fieldName: string): boolean {
    const control = this.addressFormGroup.get(`${fieldName}`);
    return control ? control.hasError('required') : false;
  }

  onBlur(item: string){
    if(item === 'city'){
      setTimeout(()=> {
          this.showSuggestions = false;
      }, 200)
    }
  }

  // private _searchCities(value: string): Observable<string[]> {
  //   if (!value.trim()) {
  //     return of([]); // no search query
  //   }
  //   // Replace 'username' with your GeoNames username
  //   const apiUrl = `http://api.geonames.org/searchJSON?name_startsWith=${value}&country=IN&maxRows=15&username=shahanashau`;

  //   return this.http.get<any>(apiUrl).pipe(
  //     map(data => data.geonames.map((city: any) => city.name)),
  //     catchError(error => {
  //       console.error('Error filtering cities:', error);
  //       return of([]); // Return empty array on error
  //     })
  //   );
  // }
}
