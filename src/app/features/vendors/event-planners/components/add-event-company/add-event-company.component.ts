import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import DOMPurify from 'dompurify';
import { EventPlannerService } from '../../services/event-planner.service';
import {
  atLeastOneSelected,
  isFieldInvalid,
  uniqueItemsValidator,
  validateMaxPrice,
} from '../../../../../core/validators/forms.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchFilterPipe } from '../../../../../core/pipes/search-filter.pipe';
import { AddressFormComponent } from '../../../../../shared/components/common/address-form/address-form.component';
import { CommonService } from '../../../../../core/services/common.service';
import { PageLoaderComponent } from '../../../../../shared/components/common/page-loader/page-loader.component';

interface Image {
  url: string;
  file: File;
}

interface service {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-add-event-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressFormComponent,
    FormsModule,
    QuillModule,
    SearchFilterPipe,
    PageLoaderComponent
  ],
  templateUrl: './add-event-company.component.html',
  styleUrl: './add-event-company.component.css',
})
export class AddEventCompanyComponent {
  searchTerm: string = '';
  isLoading = false;
  tabs: string[] = ['Company', 'Address', 'Porfolio', 'Services'];
  activeTab: number = 0;
  EventPlannerRegistrationForm: FormGroup;
  uploadedImages: Image[] = [];
  uploadedDocument: File | undefined;
  coverImageSrc: string | ArrayBuffer | null = null;
  isSubmitForm = false;
  editorConfig = this.commonservice.getQuillConfig();
  eventServicesOptions = this.eventplannerservice.getEventServices();

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private eventplannerservice: EventPlannerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const currentYear = new Date().getFullYear();

    this.EventPlannerRegistrationForm = this.fb.group({
      companyInfo: this.fb.group({
        company: ['', [Validators.required, Validators.minLength(3)]],
        website: [null, Validators.pattern('https?://.+')],
        maxEvents: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        startYear: [
          '',
          [
            Validators.required,
            Validators.min(1980),
            Validators.max(currentYear),
          ],
        ],
        minPrice: [
          '',
          [
            Validators.required,
            Validators.min(0),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        maxPrice: [
          '',
          [
            Validators.required,
            validateMaxPrice,
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        description: ['', [Validators.required, Validators.minLength(100)]],
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
        portfolios: this.fb.array(
          [],
          [Validators.required, Validators.minLength(5)]
        ),
      }),
      serviceInfo: this.fb.group({
        services: this.fb.array([], [Validators.required, atLeastOneSelected]),
        plannedCities: this.fb.array(
          [],
          [Validators.required, Validators.minLength(1), uniqueItemsValidator]
        ),
        document: [null, [Validators.required, Validators.minLength(1)]],
      }),
    });
  }

  ngOnInit(): void {
    this.initializeServicesCheckboxes();

    this.EventPlannerRegistrationForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.isSubmitForm = this.isServiceValid();
      } else {
        this.isSubmitForm = false;
      }
    });
  }

  isServiceValid(): boolean {
    return this.EventPlannerRegistrationForm.get(
      'serviceInfo.services'
    )?.value.some((obj: service) => obj.selected === true);
  }

  isFieldError(fieldgroup: string, fieldName: string): boolean | undefined {
    if (fieldgroup) {
      return isFieldInvalid(
        this.EventPlannerRegistrationForm,
        `${fieldgroup}.${fieldName}`
      );
    }
    return isFieldInvalid(this.EventPlannerRegistrationForm, `${fieldName}`);
  }

  get portfolioControls(): FormArray {
    return this.EventPlannerRegistrationForm.get(
      'portfolioInfo.portfolios'
    ) as FormArray;
  }

  // Convenience method to get the FormArray for services
  get serviceControls(): service[] {
    return (
      this.EventPlannerRegistrationForm.get('serviceInfo.services') as FormArray
    ).value;
  }

  get addressInfoFormGroup(): FormGroup {
    return this.EventPlannerRegistrationForm.get('addressInfo') as FormGroup;
  }

  get plannedCities(): FormArray {
    return this.EventPlannerRegistrationForm.get(
      'serviceInfo.plannedCities'
    ) as FormArray;
  }

  // Handle checkbox change event
  initializeServicesCheckboxes() {
    this.eventServicesOptions.forEach((value) => {
      const control = this.fb.control(value);
      (
        this.EventPlannerRegistrationForm.get(
          'serviceInfo.services'
        ) as FormArray
      ).push(control);
    });
  }

  onCheckboxChange(event: Event, index: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const servicesArray = this.EventPlannerRegistrationForm.get(
      'serviceInfo.services'
    ) as FormArray;
    const control = servicesArray.at(index) as FormGroup;
    control.patchValue({ name: control.value.name, selected: isChecked });
  }

  onAddCity() {
    const control = this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.plannedCities.push(control);
  }

  removeCity(index: number) {
    this.plannedCities.removeAt(index);
  }
  // Method to check if a form field is required
  isFieldRequired(fieldgroup: string, fieldName: string): boolean {
    const control = this.EventPlannerRegistrationForm.get(
      `${fieldgroup}.${fieldName}`
    );
    return control ? control.hasError('required') : false;
  }

  onDocumentSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0]; // Use non-null assertion
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedDocument = file;
        this.EventPlannerRegistrationForm.get(
          'serviceInfo.document'
        )?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Process each selected file
      for (
        let i = 0;
        i < files.length && files.length <= 5 && this.uploadedImages.length < 5;
        i++
      ) {
        const file = files.item(i);
        if (file) {
          const isDuplicate = this.uploadedImages.some(
            (image) => image.file.name === file.name
          );

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

      if (files.length > 5) {
        this.toastr.warning('Only 5 images can be chosen');
      }
    }
  }

  removeDocument() {
    this.uploadedDocument = undefined;
    this.EventPlannerRegistrationForm.controls['serviceInfo'].patchValue({
      document: null,
    });
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
    this.portfolioControls.removeAt(index);
  }

  onCoverPicSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImageSrc = reader.result;
        this.EventPlannerRegistrationForm.get(
          'portfolioInfo.coverPic'
        )?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverPicRemove() {
    this.coverImageSrc = null;
    this.EventPlannerRegistrationForm.controls['portfolioInfo'].patchValue({
      coverPic: null,
    });
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
      const controls = this.EventPlannerRegistrationForm.controls;
      if (this.activeTab === 0) {
        controls['companyInfo']?.markAllAsTouched();
      } else if (this.activeTab === 1) {
        controls['addressInfo']?.markAllAsTouched();
      } else if (this.activeTab === 2) {
        controls['portfolioInfo']?.markAllAsTouched();
      }
    }
  }

  canProceed(): boolean {
    const controls = this.EventPlannerRegistrationForm.controls;

    if (this.activeTab === 0) {
      //controls['companyInfo'].valid
      return controls['companyInfo'].valid;
    } else if (this.activeTab === 1) {
      //controls['companyInfo'].valid && controls['addressInfo'].valid
      return controls['companyInfo'].valid && controls['addressInfo'].valid;
    } else if (this.activeTab === 2) {
      //controls['companyInfo'].valid && controls['addressInfo'].valid && controls['portfolioInfo'].valid
      return (
        controls['companyInfo'].valid &&
        controls['addressInfo'].valid &&
        controls['portfolioInfo'].valid
      );
    } else if (this.activeTab === 3) {
      return this.isSubmitForm;
    }
    return false;
  }

  onSubmit() {
    console.log('Submit button clicked');
    const controls = this.EventPlannerRegistrationForm.controls;
    if (this.EventPlannerRegistrationForm.valid && this.isSubmitForm) {
      const rawContent = controls['companyInfo']?.value['description'];
      const sanitizedContent = DOMPurify.sanitize(rawContent);

      // Extract and filter selected services
      const selectedServices: string[] = this.EventPlannerRegistrationForm.get(
        'serviceInfo.services'
      )
        ?.value.filter((value: service) => value.selected)
        .map((value: service) => value.name);

      // Create FormData object
      const formData = new FormData();
      formData.append(
        'companyInfo',
        JSON.stringify(controls['companyInfo']?.value)
      );
      formData.append(
        'addressInfo',
        JSON.stringify(controls['addressInfo']?.value)
      );
      formData.append('description', sanitizedContent);
      formData.append('services', JSON.stringify(selectedServices));
      formData.append(
        'plannedCities',
        JSON.stringify(controls['serviceInfo'].value['plannedCities'])
      );

      // Append document file
      const documentFile = controls['serviceInfo']?.value['document'];
      if (documentFile) {
        formData.append('document', documentFile);
      }

      const coverpic = controls['portfolioInfo'].value.coverPic;
      if (coverpic) formData.append('coverPic', coverpic);

      // Append portfolio files
      const portfolioFiles = controls['portfolioInfo'].value.portfolios;
      if (portfolioFiles && portfolioFiles.length > 0) {
        for (let i = 0; i < portfolioFiles.length; i++) {
          formData.append('portfolios', portfolioFiles[i]);
        }
      }

      this.isLoading = true;
      this.eventplannerservice.submitEventPlannerForm(formData).subscribe({
        next: (res) => {
          this.toastr.success(
            'You Service SuccessFully Register Your Service!'
          );
          // this.router.navigate(['/vendor/event-planner/service'], {
          //   replaceUrl: true,
          // });
          this.isLoading = false;
        },
        error: (err: any) => {
          console.log('Submission error', err.message);
          if (err.status === 409) {
            this.toastr.error(err.message);
          } else if (err.status === 400) {
            this.toastr.error(err.message);
          } else {
            this.toastr.error(
              'Error registering the service. Please try again.'
            );
            // this.router.navigate(['/vendor/event-planner/new-service', 'EP'])
          }
          this.isLoading = false;
        },
      });
    } else {
      controls['serviceInfo'].markAllAsTouched();
    }
  }
}
