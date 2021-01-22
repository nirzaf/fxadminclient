import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import { StarRatingColor } from '../../../shared/star-rating/star-rating.component';
import { OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
export interface DialogData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}

export interface NetworkIP {
  name: string;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent implements OnInit {

  form: FormGroup;
  
  items = [];
  rating: number = 4;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.primary;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  DataArray = [];
  countryList = [];
  cityList = [];
  stateList = [];
  formGroup: FormGroup;
  holdingCompanyData: DialogData;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // networkIPs: NetworkIP[] = [
  //   { name: '192.168.3.1' },
  //   { name: '192.168.3.2' },
  //   { name: '192.168.3.3' },
  // ];
 
  value = this.fb.group({

  });
  public validate(): void {
    this.formGroup = this.fb.group({
      'formArray1': this.fb.array([
        this.initX(true)
      ])
    });
   
  }
  get f() { return this.formGroup.controls; }

  public initX(panelState): FormGroup {

    this.DataArray.push({
      countryList: this.countryList,
      stateList: [],
      cityList: [],
      PanelOpenState: panelState,
      propertyState:0,
      propertyCity:0,
      propertyCountry:0,
      dayList:[],
      currencyList:[],
      propertyCurrency:0,
      propertyOtherCurrency:0,
      propertyWeekends:0,
      propertyWeekDays:0,
      propertyHotelType:0,
      networkIPs:[],
      rating:0,
      hotelTypeList:[],
      macIDs:[]

    })
 
    return this.fb.group({

      propertyName: [, { validators: [Validators.required], updateOn: "change" }],
      propertyCode: [, { validators: [Validators.required], updateOn: "change" }],
      propertyAddress: [, { validators: [Validators.required], updateOn: "change" }],
      propertyCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyPinZip: [, { validators: [Validators.required], updateOn: "change" }],
      propertyPhone: [, { validators: [Validators.required], updateOn: "change" }],
      propertyHotelType: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyCheckIn: [, { validators: [Validators.required], updateOn: "change" }],
      propertyCheckOut: [, { validators: [Validators.required], updateOn: "change" }],
      propertyWebsite: [, { validators: [Validators.required], updateOn: "change" }],
      propertyWeekDays: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyWeekends: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyCurrency: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyOtherCurrency: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyNetworkIP: [, { validators: [], updateOn: "change" }],
      propertyMacAddress: [, { validators: [], updateOn: "change" }],
      propertyStarRating: [, { validators: [Validators.required], updateOn: "change" }],
    });
  }
  public addX(): void {
    const control = <FormArray>this.f.formArray1;
    control.push(this.initX(false));
  }



  removeX(index) {
    const control = <FormArray>this.f.formArray1;
    control.removeAt(index);

  }
  

  
  


  addNetworkIP(event: MatChipInputEvent,i): void {
    const input = event.input;
    const value = event.value;

  
    // Add our fruit
    if ((value || '').trim()) {
      this.DataArray[i].networkIPs.push({ name: value.trim() });
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeNetworkIP(networkIP: NetworkIP,i): void {
    
    
    const index = this.DataArray[i].networkIPs.indexOf(networkIP);

    if (index >= 0) {
      this.DataArray[i].networkIPs.splice(index, 1);
    }
  }
  addMacID(event: MatChipInputEvent,i): void {
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.DataArray[i].macIDs.push({ name: value.trim() });
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMacID(macID: MacID, i): void {

    const index = this.DataArray[i].macIDs.indexOf(macID);
    if (index >= 0) {
      this.DataArray[i].macIDs.splice(index, 1);
    }
  }
  


  constructor(
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder,private webService:WebService,private toast: ToastService) {
    
    this.getCountryList();
  }
  ngOnInit() {
    this.validate();
  }
  onRatingChanged(rating, i) {
 
    this.DataArray[i].rating = rating;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getCityList(stateID, i) {

    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
     
          this.DataArray[i].cityList = data.data;
          this.DataArray[i].propertyCity=0;
        }
        else {
          this.toast.error(data.errors);
        }
        console.log(data);
      
      });
  }

  getCountryList() {
    this.webService.commonMethod('country/get?pageSize=100', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.countryList = data.data;
          this.DataArray[0].countryList = data.data;
      
        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  getStateList(countryID, i) {

 

    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
    
       
          this.DataArray[i].stateList = data.data;
         // item.value.groupState = 0;
          this.DataArray[i].propertyState=0;

        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }


   
      
      });
  }

}
