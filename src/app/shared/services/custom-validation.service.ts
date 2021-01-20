import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class CustomValidationService {

  constructor() { }

  // Number Validation
  customAlphabet(formControl: FormControl) {
    let REGEXP = /^[a-zA-Z ]*$/;

    return REGEXP.test(formControl.value) ? null : {
      customAlphabet: {
        valid: false
      }
    }
  }

  customMobileNumberValidation(formControl: FormControl) {
    let REGEXP = /^((\\+91-?)|0)?[0-9]{10}$/;
    return REGEXP.test(formControl.value) ? null : {
      customMobileNumberValidation: {
        valid: false
      }
    }
  }

  // Custom Email Validation
  customEmail(formControl: FormControl) {
    if (formControl.value) {
      let REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/i;

      return REGEXP.test(formControl.value) ? null : {
        customEmail: {
          valid: false
        }
      }
    }
  }


  customEmaiValidation(formControl: FormControl) {
    let REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return REGEXP.test(formControl.value) ? null : {
      customMobileNumberValidation: {
        valid: false
      }
    }
  }

  // Number Validation
  customNumber(formControl: FormControl) {
    let REGEXP = /^\d+$/;

    return REGEXP.test(formControl.value) ? null : {
      customNumber: {
        valid: false
      }
    }
  }

  // Alphanumaric Validations
  customAlphanumaric(formControl: FormControl) {
    let REGEXP = /^[a-zA-Z0-9 ]*$/;
    return REGEXP.test(formControl.value) ? null : {
      customAlphanumaric: {
        valid: false
      }
    }
  }

  // Number only validation
  customNumberOnly(formControl: FormControl) {
    let REGEXP = /^[0-9]+$/;

    if (!isNaN(formControl.value)) {
      return REGEXP.test(formControl.value) ? null : {
        customNumberOnly: {
          valid: false
        }
      }
    }

    return null;
  }

  // Number only validation only for display sequence
  customNumberFor(formControl: FormControl) {
    if (!formControl.value) {
      return null;
    }
    else {
      let REGEXP = /^[0-9]+$/;

      if (!isNaN(formControl.value)) {
        return REGEXP.test(formControl.value) ? null : {
          customNumberFor: {
            valid: false
          }
        }
      }

      return null;
    }
  }

  // Alpha Numeric Validations
  customAlphaNumeric(formControl: FormControl) {
    let REGEXP = /^[a-zA-Z0-9]*$/;

    return REGEXP.test(formControl.value) ? null : {
      customAlphaNumeric: {
        valid: false
      }
    }
  }

  // Space Validations
  customSpace(formControl: FormControl) {
    let REGEXP = /\w/;

    return REGEXP.test(formControl.value) ? null : {
      customSpace: {
        valid: false
      }
    }
  }

  customSpaceValidation(formControl: FormControl) {
    return typeof formControl.value == 'string' && formControl.value.indexOf(" ") == -1 ? null : {
      customSpaceValidation: {
        valid: false
      }
    }
  }

  customGSTINvalidation(formControl: FormControl) {
    let REGEXP = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;

    return REGEXP.test(formControl.value) ? null : {
      customGSTINvalidation: {
        valid: false
      }
    }
  }

  customMinLength(formControl: FormControl) {
    if (formControl.value != '' && formControl.value != null && formControl.value != undefined) {
      return formControl.value && formControl.value.trim().length > 0 ? null : {
        customMinLength: {
          valid: false
        }
      }
    }
  }

  customNameMinLength(formControl: FormControl) {
    if (formControl.value != '' && formControl.value != null && formControl.value != undefined) {
      return formControl.value && formControl.value.trim().length > 1 ? null : {
        customNameMinLength: {
          valid: false
        }
      }
    }
  }

  customEmailValidation(formControl: FormControl) {
    let str = formControl.value;
    if (typeof str == 'string') {
      let x = str.split('.');
      return ((x[x.length - 1]) != 'web') ? null : {
        customEmailValidation: {
          valid: false
        }
      }
    }
  }

  emailValidation(formControl: FormControl) {
    let REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return REGEXP.test(formControl.value) ? null : {
      customGSTINvalidation: {
        valid: false
      }
    }
  }


  customMinLengthForMkt(formControl: FormControl) {
    return formControl.value && formControl.value.trim().length > 0 ? null : {
      customMinLength: {
        valid: false
      }
    }
  }

  exchangeRateSearchMinLength(formControl: FormControl) {
    return formControl.value && formControl.value.trim().length >= 1 ? null : {
      exchangeRateSearchMinLength: {
        valid: false
      }
    }
  }

  revenueSacHsnMaxLength(formControl: FormControl) {
    return formControl.value && formControl.value.trim().length <= 20 ? null : {
      revenueSacHsnMaxLength: {
        valid: false
      }
    }
  }

  customMinLengthSingle(formControl: FormControl) {
    return formControl.value && formControl.value.trim().length > 0 ? null : {
      customMinLengthSingle: {
        valid: false
      }
    }
  }

  // Alpha Numeric with Space Validations
  customAlphaNumericWithSpace(formControl: FormControl) {
    let REGEXP = /^[a-zA-Z0-9\-\s]+$/;

    return REGEXP.test(formControl.value) ? null : {
      customAlphaNumericWithSpace: {
        valid: false
      }
    }
  }

  // Alpha Numeric with Special char Validations
  customAlphaNumericWithSpecialCharacter(formControl: FormControl) {
    let REGEXP = /^[-@./#&+\w\s]*$/;

    return REGEXP.test(formControl.value) ? null : {
      customAlphaNumericWithSpecialCharacter: {
        valid: false
      }
    }
  }

  // Decimal Number only validation
  customDecimalNumber(formControl: FormControl) {
    let REGEXP = /^[0-9.]+$/;

    if (formControl.value && formControl.value != '.') {
      return REGEXP.test(formControl.value) ? null : {
        customDecimalNumber: {
          valid: false
        }
      }
    }
  }

  // Decimal Number only validation
  onlyZeroNotAllowedForDecimal(formControl: FormControl) {
    return formControl.value !== "" && parseFloat(formControl.value) == 0 ? {
      onlyZeroNotAllowedForDecimal: {
        valid: true
      }
    } : null;
  }

  // Decimal Number only validation
  customMinNumber(formControl: FormControl) {
    let REGEXP = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/

    if (formControl.value) {
      return REGEXP.test(formControl.value) ? null : {
        customDecimalNumber: {
          valid: false
        }
      }
    }
  }

  // Decimal Number only validation
  maxLengthDecimalValidation(formControl: FormControl) {
    if (formControl.value) {
      if (formControl.value.isInteger) {
        return formControl.value && formControl.value.trim().length <= 10 ? null : {
          maxLengthDecimalValidation: {
            valid: false
          }
        }
      } else {
        let splitedValue = formControl.value.toString().split('.');
        if (splitedValue[0]) {
          return splitedValue[0] && splitedValue[0].trim().length <= 10 ? null : {
            maxLengthDecimalValidation: {
              valid: false
            }
          }
        }
      }
    }
  }

  // Decimal Number only validation
  maxLengthPercentageValidation(formControl: FormControl) {
    if (formControl.value) {
      if (formControl.value.isInteger) {
        return formControl.value && formControl.value.trim().length <= 2 ? null : {
          maxLengthPercentageValidation: {
            valid: false
          }
        }
      } else {
        let splitedValue = formControl.value.toString().split('.');
        if (splitedValue[0]) {
          return splitedValue[0] && splitedValue[0].trim().length <= 2 ? null : {
            maxLengthPercentageValidation: {
              valid: false
            }
          }
        }
      }
    }
  }

  // Decimal Number with only 2 Decimals only validation
  customDecimalLimitNumber(formControl: FormControl) {
    let REGEXP = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/

    if (formControl.value) {
      return REGEXP.test(formControl.value) ? null : {
        customDecimalLimitNumber: {
          valid: false
        }
      }
    }
  }

  // Decimal Number only validation
  customPercentageNumber(formControl: FormControl) {
    let REGEXP = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    if (formControl.value && formControl.value != '.') {
      return REGEXP.test(formControl.value) ? null : {
        customPercentageNumber: {
          valid: false
        }
      }
    }
  }

  // Url Validations - No http validation Only - string +  dot(.) + string - (Last string 2 to 7 char only)
  customUrlValidation(formControl: FormControl) {
    let REGEXP = /^[A-Za-z0-9_]+\.[A-Za-z]{2,7}$/;

    return REGEXP.test(formControl.value) ? null : {
      customUrlValidation: {
        valid: false
      }
    }
  }

  //Address Validation
  customAddress(formControl: FormControl) {
    let REGEXP = /^[a-zA-Z0-9\s,'-]*$/;
    return REGEXP.test(formControl.value) ? null : {
      customAddress: {
        valid: false
      }
    }
  }

  //Zip/PostalCode Validation
  customZip(formControl: FormControl) {
    let REGEXP = /^[0-9\s-]*$/;
    return REGEXP.test(formControl.value) ? null : {
      customZip: {
        valid: false
      }
    }
  }

  //Phone Validation
  customPhone(formControl: FormControl) {
    let REGEXP = /^[0-9-]*$/;
    return REGEXP.test(formControl.value) ? null : {
      customPhone: {
        valid: false
      }
    }
  }

  //URL Validation
  customUrl(formControl: FormControl) {
    let REGEXP = /^[0-9-]*$/;
    return REGEXP.test(formControl.value) ? null : {
      customUrl: {
        valid: false
      }
    }
  }

  customDisplaySequenceValidation(formControl: FormControl) {
    return formControl.value !== "" && formControl.value.length > 8 ? { customDisplaySequenceValidation: { valid: false } } : null;
  }

  customNumberOnlyForDisplaySequence(formControl: FormControl) {
    let REGEXP = /^[0-9]*$/;

    if (formControl.value !== "" && parseInt(formControl.value) != NaN) {
      return REGEXP.test(formControl.value) ? null : {
        customNumberOnlyForDisplaySequence: {
          valid: false
        }
      }
    }

    return null;
  }

  onlyZeroNotAllowed(formControl: FormControl) {
    return formControl.value !== "" && parseInt(formControl.value) == 0 ? { onlyZeroNotAllowed: { valid: true } } : null;
  }

  //URL Validation
  salesOfficeValidate(formControl: FormControl) {
    let arrayLength = formControl.value.length;
    if (arrayLength) {
      let REGEXP = /^[0-9]*$/;
      return REGEXP.test(arrayLength) ? null : {
        salesOfficeValidate: {
          valid: false
        }
      }
    }
  }

  customSalesExecutiveNameMinLength(formControl: FormControl) {
    return formControl.value.trim().length > 1 ? null : {
      customSalesExecutiveNameMinLength: {
        valid: false
      }
    }
  }
  customMarketSegmentNameMinLength(formControl: FormControl) {
    return formControl.value.trim().length > 1 ? null : {
      customMarketSegmentNameMinLength: {
        valid: false
      }
    }
  }

  customBusinessSourceNameMinLength(formControl: FormControl) {
    return formControl.value.trim().length > 1 ? null : {
      customBusinessSourceNameMinLength: {
        valid: false
      }
    }
  }

  customPreferenceNameMinLength(formControl: FormControl) {
    return formControl.value.trim().length > 1 ? null : {
      customPreferenceNameMinLength: {
        valid: false
      }
    }
  }

  customMembershipTypeNameMinLength(formControl: FormControl) {
    return formControl.value.trim().length > 1 ? null : {
      customMembershipTypeNameMinLength: {
        valid: false
      }
    }
  }

  spaceValidation(formControl: FormControl) {
    return formControl.value.trim().length > 0 ? null : { spaceValidation: { valid: false } }
  }

  multiSelectValidation(fromControl: FormControl) {
    return fromControl.value.length == 0 ? { multiSelectValidation: { valid: false } } : null;
  }
  rateValidation(formControl: FormControl) {
    if (formControl.value) {
      if (formControl.value == '.') {
        return { rateValidation: { valid: false } }
      }
      else if (Number(formControl.value) == 0) {
        return { rateValidation: { valid: false } }
      }

    }
    return null;
  }
  maxRateValidation(formControl: FormControl) {
    if (formControl.value && typeof formControl.value == 'string') {
      let x = formControl.value.split('.');
      if (x[0].length > 10) {
        return { maxRateValidation: { valid: false } }
      }
    }
  }
  maxRateLengthValidation(formControl: FormControl) {
    if (formControl.value && typeof formControl.value == 'string') {
      let x = formControl.value.split('.');
      if (x[0].length > 3) {
        return { maxRateValidation: { valid: false } }
      }
    }
  }

  taxSlabValueValidation(formControl: FormControl) {
    if (formControl.value) {
      if (formControl.value == '.') {
        return { rateValidation: { valid: false } }
      }
      else if (Number(formControl.value) < 0) {
        return { rateValidation: { valid: false } }
      }

    }
    return null;
  }
}
