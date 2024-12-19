import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../../../core/services/address.service';
import { Router } from '@angular/router';
import { atLeastOneSelected, isFieldInvalid, platePriceValidator } from '../../../../../core/validators/forms.validator';
import DOMPurify from 'dompurify';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../../../../../core/pipes/search-filter.pipe';
import { QuillModule } from 'ngx-quill';
import { AddressFormComponent } from '../../../../../shared/components/common/address-form/address-form.component';
import { VenueVendorService } from '../../services/venue-vendor.service';
import { CommonService } from '../../../../../core/services/common.service';
import { ToastrAlertService } from '../../../../../core/services/toastr.service';



interface Image {
  url: string;
  file: File;
}

interface checkBox {
  name: string;
  selected: boolean
}

@Component({
  selector: 'app-venue-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchFilterPipe,
    ReactiveFormsModule,
    QuillModule,
    AddressFormComponent

  ],
  templateUrl: './venue-registration.component.html',
  styleUrl: './venue-registration.component.css'
})


export class VenueRegistrationComponent {
  VenueRegistrationForm: FormGroup;
  searchTerm: string = '';
  tabs: string[] = ['Venue', 'Price', 'Address', 'Porfolio', 'Capacity'];
  activeTab: number = 0;
  uploadedImages: Image[] = [];
  uploadedDocument: File | null = null;
  coverImageSrc: string | ArrayBuffer | null = null;
  isSubmitForm = false;
  SelectPriceType = false;
  editorConfig = this.commonservice.getQuillConfig();
  venueTypeOptions = this.venueVendorService.getVenuTypes();
  amenitiesOptions = this.venueVendorService.getAmenities();
  servicesOptions = this.venueVendorService.getServices();
  amenityHalfLength = this.amenitiesOptions.length;
  servicesHalfLength = this.servicesOptions.length;


  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private venueVendorService: VenueVendorService,
    private router: Router,
    private toastr: ToastrAlertService,
  ) {
    const currentYear = new Date().getFullYear();

    this.VenueRegistrationForm = this.fb.group({
      venueInfo: this.fb.group({
        venueName: ['', [Validators.required, Validators.minLength(3)]],
        venueType: ['', [Validators.required]],
        maxEvents: ['', [Validators.required,Validators.min(1), Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        startYear: ['', [Validators.required, Validators.min(1980), Validators.max(currentYear)]],
        description: ['', [Validators.required, Validators.minLength(100)]],
      }),
      priceInfo: this.fb.group({
        includePricePerPlate: [false],
        includeRooms: [false],
        includeDecor: [false],
        rent: [null, [Validators.min(1), Validators.pattern('^[0-9]+$'), Validators.required]],
        platePrice: this.fb.group({
          vegPerPlate: [null, [Validators.min(1), Validators.pattern('^[0-9]+$')]],
          nonVegPerPlate: [null, [Validators.min(1), Validators.pattern('^[0-9]+$')]]
        }),
        rooms: this.fb.group({
          count: [null, [Validators.min(1), Validators.pattern('^[0-9]+$')]],
          startingPrice: [null, [Validators.min(10), Validators.pattern('^[0-9]+$')]]
        }),
        decorStartingPrice: [null, [Validators.min(10), Validators.pattern('^[0-9]+$')]],
      }),
      addressInfo: this.fb.group({
        building: ['', [Validators.required, Validators.minLength(3)]],
        street: [null, Validators.minLength(3)],
        city: ['', [Validators.required, Validators.minLength(3)]],
        town: [null, Validators.minLength(3)],
        district: ['', [Validators.required, Validators.minLength(3)]],
        state: ['', [Validators.required, Validators.minLength(3)]],
        landmark: [null, Validators.minLength(4)],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      }),
      portfolioInfo: this.fb.group({
        coverPic: [null, [Validators.required]],
        portfolios: this.fb.array([], [Validators.required, Validators.minLength(5)])
      }),
      capacityInfo: this.fb.group({
        areas: this.fb.array([], Validators.required),
        amenities: this.fb.array([], [Validators.required, atLeastOneSelected]),
        services: this.fb.array([], [Validators.required, atLeastOneSelected]),
        document: [null, [Validators.required]],
      }),
    });
  }


  ngOnInit(): void {
    this.initializeCheckboxes();

    this.amenityHalfLength = Math.ceil(this.amenitiesOptions.length / 2);
    this.servicesHalfLength = Math.ceil(this.servicesOptions.length / 2);

     // Enable/disable fields based on 'includeRooms' checkbox
     this.VenueRegistrationForm.get('priceInfo.includeRooms')?.valueChanges.subscribe(checked => {
      const roomsGroup = this.VenueRegistrationForm.get('priceInfo.rooms') as FormGroup;
      if (checked) {
        roomsGroup.get('count')?.addValidators(Validators.required);
        roomsGroup.get('startingPrice')?.addValidators(Validators.required);
        roomsGroup.get('count')?.enable();
        roomsGroup.get('startingPrice')?.enable();
      } else {
        roomsGroup.get('count')?.removeValidators(Validators.required);
        roomsGroup.get('startingPrice')?.removeValidators(Validators.required);
        roomsGroup.get('count')?.disable();
        roomsGroup.get('startingPrice')?.disable();
      }
      roomsGroup.updateValueAndValidity();
    });

    // Enable/disable fields based on 'includeDecor' checkbox
    this.VenueRegistrationForm.get('priceInfo.includeDecor')?.valueChanges.subscribe(checked => {
      const decorCtrl = this.VenueRegistrationForm.get('priceInfo.decorStartingPrice');
      if (checked) {
        decorCtrl?.addValidators(Validators.required);
        decorCtrl?.enable();
      } else {
        decorCtrl?.removeValidators(Validators.required);
        decorCtrl?.disable();
      }
    });

    // Enable/disable fields based on 'includePricePerPlate' checkbox
    this.VenueRegistrationForm.get('priceInfo.includePricePerPlate')?.valueChanges.subscribe(checked => {
      const platePriceGroup = this.VenueRegistrationForm.get('priceInfo.platePrice') as FormGroup;
      if (checked) {
        platePriceGroup.setValidators(platePriceValidator());
        platePriceGroup?.enable();
      } else {
        platePriceGroup?.removeValidators(platePriceValidator);
        platePriceGroup?.disable();
      }
    });


    this.VenueRegistrationForm.statusChanges.subscribe((status) => {
        if(status === 'VALID'){
            console.log(this.VenueRegistrationForm);
            this.isSubmitForm = this.isServicesValid() && this.isAmenitiesValid();
        } else {
            this.isSubmitForm = false;
        }
    });
  }


  // Handle checkbox change event
  initializeCheckboxes() {
    this.servicesOptions.forEach((value) => {
      const control = this.fb.control(value);
      (this.VenueRegistrationForm.get('capacityInfo.services') as FormArray).push(control);
    });

    this.amenitiesOptions.forEach((value) => {
      const control = this.fb.control(value);
      (this.VenueRegistrationForm.get('capacityInfo.amenities') as FormArray).push(control);
    });
  }

  // Getter for accessing areas as FormArray
  get areas(): FormArray {
    return this.VenueRegistrationForm.get('capacityInfo.areas') as FormArray;
  }


  // Method to add a new area to the areas FormArray
  addArea() {
    this.areas.push(this.fb.group({
      areaType: ['', [Validators.required]],
      areaName: ['', [Validators.required, Validators.minLength(3)]],
      floats: [null, [Validators.required, Validators.min(10), Validators.pattern('^[0-9]+$')]],
      seats: [null, [Validators.required, Validators.min(10), Validators.pattern('^[0-9]+$')]]
    }));
  }

  // Method to remove an area from the areas FormArray
  removeArea(index: number) {
    this.areas.removeAt(index);
  }

  isServicesValid(): boolean {
    return this.VenueRegistrationForm.get('capacityInfo.services')?.value.some(
      (obj: checkBox)=> obj.selected === true)
  }

  isAmenitiesValid(): boolean {
    return this.VenueRegistrationForm.get('capacityInfo.amenities')?.value.some(
      (obj: checkBox)=> obj.selected === true)
  }

  isFieldError(fieldgroup: string, fieldName: string): boolean | undefined{
    if(fieldgroup){
      return isFieldInvalid(this.VenueRegistrationForm, `${fieldgroup}.${fieldName}`);
    }
    return isFieldInvalid(this.VenueRegistrationForm, `${fieldName}`);
  }

  // Method to check if a form field is required
  isFieldRequired(fieldgroup: string, fieldName: string): boolean {
    const control = this.VenueRegistrationForm.get(`${fieldgroup}.${fieldName}`);
    return control ? control.hasError('required') : false;
  }

  get amenitiesControls(): checkBox[]  {
    return (this.VenueRegistrationForm.get('capacityInfo.amenities') as FormArray).value;
  }

  get portfolioControls(): FormArray {
    return this.VenueRegistrationForm.get('portfolioInfo.portfolios') as FormArray;
  }

  // Convenience method to get the FormArray for services
  get serviceControls(): checkBox[] {
    return (this.VenueRegistrationForm.get('capacityInfo.services') as FormArray).value;
  }


  get addressInfoFormGroup(): FormGroup {
    return this.VenueRegistrationForm.get('addressInfo') as FormGroup;
  }

  onDocumentSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0]; // Use non-null assertion
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedDocument = file;
        this.VenueRegistrationForm.get('capacityInfo.document')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Process each selected file
      for (let i = 0; i < files.length && this.uploadedImages.length < 5; i++) {
        const file = files.item(i);
        if (file) {
          const isDuplicate = this.uploadedImages.some(image => image.file.name === file.name);

          if (!isDuplicate) {
            // Create URL for preview
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.uploadedImages.push({ url: e.target.result, file });
              this.portfolioControls.push(this.fb.control(file));
            };
            reader.readAsDataURL(file);
          } else {
            console.log(`File ${file.name} is already selected.`);
          }
        }
      }
    }
  }

  onCoverPicSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImageSrc = reader.result;
        this.VenueRegistrationForm.get('portfolioInfo.coverPic')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverPicRemove(){
     this.coverImageSrc = null;
     this.VenueRegistrationForm.controls['portfolioInfo'].patchValue({
      coverPic: null
    });
  }

  removeDocument() {
    this.uploadedDocument = null;
    this.VenueRegistrationForm.controls['capacityInfo'].patchValue({
      document: null
    });
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
    this.portfolioControls.removeAt(index);
  }

  onCheckboxChange(event: Event, index: number, type: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    let arr;
    if(type === 'amenities'){
        arr = this.VenueRegistrationForm.get('capacityInfo.amenities') as FormArray;
    } else if(type === 'services'){
        arr = this.VenueRegistrationForm.get('capacityInfo.services') as FormArray;
    }
    const control = arr?.at(index) as FormGroup;
    control.patchValue({  name: control.value.name, selected: isChecked });
  }

  setActiveTab(index: number) {
    if (index < this.activeTab) {
      this.activeTab = index;
    } else if (this.canProceed()) {
      this.activeTab = index;
    }
  }

  prevTab() {
    if (this.activeTab > 0) {
      this.activeTab--;
    }
  }

  nextTab() {
    if (this.canProceed()) {
      this.activeTab++;
    } else {
      const controls = this.VenueRegistrationForm.controls;
      if(this.activeTab === 0){
          controls['venueInfo']?.markAllAsTouched();
      } else if(this.activeTab === 1){
          controls['priceInfo']?.markAllAsTouched();
      } else if(this.activeTab === 2){
          controls['addressInfo']?.markAllAsTouched();
      } else if(this.activeTab === 3){
          controls['portfolioInfo']?.markAllAsTouched();
      }
    }
  }

  canProceed(): boolean {
    const controls = this.VenueRegistrationForm.controls;
    if (this.activeTab === 0) {
      //controls['venueInfo'].valid
      return controls['venueInfo'].valid;
    } else if (this.activeTab === 1) {
      //controls['venueInfo'].valid && controls['priceInfo'].valid
      return controls['venueInfo'].valid && controls['priceInfo'].valid;
    } else if (this.activeTab === 2) {
      //controls['venueInfo'].valid & controls['priceInfo'].valid && controls['addressInfo'].valid
      return controls['venueInfo'].valid && controls['priceInfo'].valid && controls['addressInfo'].valid;
    } else if (this.activeTab === 3) {
      //controls['venueInfo'].valid && controls['priceInfo'].valid && controls['addressInfo'].valid
      //  && controls['portfolioInfo'].valid
      return controls['venueInfo'].valid && controls['priceInfo'].valid &&
         controls['addressInfo'].valid && controls['portfolioInfo'].valid;
    } else if (this.activeTab === 4) {
      //this.isSubmitForm
      return this.isSubmitForm;
    }
    return false;
  }


  onSubmit() {
    const controls = this.VenueRegistrationForm.controls;

    if (this.VenueRegistrationForm.valid && this.isSubmitForm) {
      const venueInfo = controls['venueInfo'].value;
      const priceInfo = controls['priceInfo'].value;
      const addressInfo = controls['addressInfo'].value;
      const portfolioInfo = controls['portfolioInfo'].value;
      const capacityInfo = controls['capacityInfo'].value;
      const rawDescription = venueInfo['description'];
      const sanitizedDescription = DOMPurify.sanitize(rawDescription);

      // Extract and filter selected amenities
      const selectedAmenities: string[] = capacityInfo.amenities
        .filter((amenity: { name: string, selected: boolean }) => amenity.selected)
        .map((amenity: { name: string, selected: boolean }) => amenity.name);

      // Extract and filter selected services
      const selectedServices: string[] = capacityInfo.services
        .filter((service: { name: string, selected: boolean }) => service.selected)
        .map((service: { name: string, selected: boolean }) => service.name);

      // Create FormData object
      const formData = new FormData();
      formData.append('venueInfo', JSON.stringify(venueInfo));
      formData.append('priceInfo', JSON.stringify(priceInfo));
      formData.append('addressInfo', JSON.stringify(addressInfo));
      formData.append('description', sanitizedDescription);
      formData.append('services', JSON.stringify(selectedServices));
      formData.append('amenities', JSON.stringify(selectedAmenities));
      formData.append('areas', JSON.stringify(capacityInfo.areas));

      // Append document file
      const documentFile = capacityInfo.document;
      if (documentFile) formData.append('document', documentFile);

      const coverpic = portfolioInfo.coverPic;
      if(coverpic) formData.append('coverPic', coverpic);

      // Append portfolio files
      const portfolioFiles = portfolioInfo.portfolios;
      if (portfolioFiles && portfolioFiles.length > 0) {
        for (let i = 0; i < portfolioFiles.length; i++) {
          formData.append('portfolios', portfolioFiles[i]);
        }
      }

      this.venueVendorService.submitVenuForm(formData).subscribe({
        next: (res) => {
          this.toastr.success("Your service has been successfully registered!");
          this.router.navigate(['/vendor/venue-vendor/service'], { replaceUrl: true });
        },
        error: (err: any) => {
          console.error("Submission error", err.message);
          if (err.status === 409) {
            this.toastr.error(err.message, 'Error');
          } else if (err.status === 400) {
            this.toastr.error(err.message, 'Error');
          } else {
            this.toastr.error("Error registering the service. Please try again.");
          }
        }
      });
    } else {
      controls['capacityInfo'].markAllAsTouched();
    }
  }
}
