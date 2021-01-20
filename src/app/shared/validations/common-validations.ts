import { ValidatorFn, AbstractControl, ControlContainer } from '@angular/forms';


export function noTwoWhiteSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const nameRe: RegExp = new RegExp('[ \t]{2,}');
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'twoWhiteSpaces': {value: control.value}} : null;
    };
}

export function numbersValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const nameRe: RegExp = new RegExp('[0-9]*');
        const forbidden = control.value!==null && nameRe.test(control.value);
        return forbidden ? {'notANumbers': {value: control.value}} : null;
    };
}

