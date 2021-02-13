import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMM YYYY,ddd',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export interface DialogData {

}
export interface NetworkIP {
  name: string;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  validFrom = new FormControl();
  validTO = new FormControl();
  birthDate = new FormControl();
  linkProperty=false;
  networkIPs=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  macIDs=[];
  holdingCompanyData: DialogData;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }
  addNetworkIP(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
   
  
    // Add our fruit
    if ((value || '').trim()) {
      this.networkIPs.push({ name: value.trim() });
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeNetworkIP(networkIP: NetworkIP): void {
    
    
    const index = this.networkIPs.indexOf(networkIP);

    if (index >= 0) {
      this.networkIPs.splice(index, 1);
    }
  }
  addMacID(event: MatChipInputEvent): void {
    
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.macIDs.push({ name: value.trim() });
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMacID(macID: MacID): void {

    const index = this.macIDs.indexOf(macID);
    if (index >= 0) {
      this.macIDs.splice(index, 1);
    }
  }
  submitForm(){
this.linkProperty=true;
  }

}
