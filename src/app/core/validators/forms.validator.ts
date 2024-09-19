
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Check if the password and confirmPassword fields have values and if they match
    if (password !== confirmPassword) {
      return { confirmPasswordMismatch: true };
    }
    return null;
  };
}

function isFieldInvalidator(formGroup: FormGroup, fieldName: string): boolean {
  return (
    (formGroup?.controls[fieldName]?.touched || formGroup?.controls[fieldName]?.dirty) &&
    formGroup?.controls[fieldName]?.invalid
  );
}

function isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean  | undefined{
  return (
    (formGroup?.get(fieldName)?.touched || formGroup?.get(fieldName)?.dirty) &&
    formGroup?.get(fieldName)?.invalid
  );
}


function minAmountValidator(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    if (isNaN(value) || value < min) {
      return { 'minAmount': { value: control.value } };
    }
    return null;
  };
}

function validateMaxPrice(control: AbstractControl): { [key: string]: any } | null {
  const maxPrice = control.value;
  const minPrice = control.root.get('companyInfo.minPrice')?.value;
  if (parseInt(maxPrice) <= parseInt(minPrice)) {
    return { 'maxPriceLessThanMin': true }; // Validation fails
  }
  return null; // Validation passes
}


function uniqueItemsValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && Array.isArray(control.value)) {
      const uniqueItems = new Set(control.value);
      if (uniqueItems.size !== control.value.length) {
        return { duplicateItems: 'Array contains duplicate values' };
      }
  };
  return null;
}

function atLeastOneSelected(control: AbstractControl): ValidationErrors | null  {
    if (!control.value || !Array.isArray(control.value)) {
      return null; // not the correct type, so we don't validate here
    }

    const isAtLeastOneSelected = control.value.some((item: { selected: boolean }) => item.selected === true);
    return isAtLeastOneSelected ? null : { atLeastOneSelected: true };
}

function platePriceValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const vegPerPlate = group.get('vegPerPlate')?.value;
    const nonVegPerPlate = group.get('nonVegPerPlate')?.value;
    if (!vegPerPlate && !nonVegPerPlate) {
      return { requiredPlatePrice: true };
    }
    return null; // Form group is invalid
  };
}


function eventDateValidator(group: AbstractControl): ValidationErrors | null {
  const startDate = group.root.get('eventInfo.eventDate.startDate')?.value;
  const isMultipleDays = group.root.get('eventInfo.isMultipleDays')?.value;
  const endDate = group.root.get('eventInfo.eventDate.endDate')?.value;


  if (!isMultipleDays) {
    if (startDate && endDate && new Date(startDate).getTime() !== new Date(endDate).getTime()) {
      return { dateOrderInvalid: true }; // Error if dates are not the same
    }
  } else {
    // If isMultipleDays is true, ensure endDate is greater than or equal to startDate
    if (startDate && endDate && new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      return { dateOrderInvalid: true }; // Error if endDate is earlier than startDate
    }
  }



  return null;
}

function checkEndDateValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.root.get('startDate')?.value;
    const endDate = group.value;

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return { dateOrderInvalid: true };
    }

    return null;
}



export  {
  confirmPasswordValidator,
  isFieldInvalidator,
  minAmountValidator,
  validateMaxPrice,
  isFieldInvalid,
  uniqueItemsValidator,
  atLeastOneSelected,
  platePriceValidator,
  eventDateValidator,
  checkEndDateValidator
}
