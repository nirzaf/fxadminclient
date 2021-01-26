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
  groupID:string;
  groupName:string;
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
  currencyList=[];
  dayList=[];
  hotelTypeList=[];
  cityList = [];
  stateList = [];
  formGroup: FormGroup;
  holdingCompanyData: DialogData;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

 
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
      dayList:this.dayList,
      currencyList:this.currencyList,
      propertyCurrency:0,
      propertyOtherCurrency:0,
      propertyWeekends:0,
      propertyWeekDays:0,
      propertyHotelType:0,
      
      networkIPs:[],
      
      rating:0,
      hotelTypeList:this.hotelTypeList,
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
      propertyWeekDays: [, { validators: [Validators.required], updateOn: "change" }],
      propertyWeekends: [, { validators: [Validators.required], updateOn: "change" }],
      propertyCurrency: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      propertyOtherCurrency: [, { validators: [Validators.required], updateOn: "change" }],
      propertyNetworkIP: [, { validators: [], updateOn: "change" }],
      propertyMacAddress: [, { validators: [], updateOn: "change" }],
     
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
    this.holdingCompanyData=data;
    this.getCountryList();
    this.getCurrencyList();
    this.getHotelTypeList();
    this.getDayList();
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
  getCurrencyList() {
    this.webService.commonMethod('currency/get?pageSize=10000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.currencyList = data.data;
          this.DataArray[0].currencyList = data.data;
      
        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  getHotelTypeList() {
    this.webService.commonMethod('hotelType/get?pageSize=10000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.hotelTypeList = data.data;
          this.DataArray[0].hotelTypeList = data.data;
      
        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  getDayList() {
    this.webService.commonMethod('day/get?pageSize=10000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.dayList = data.data;
          this.DataArray[0].dayList = data.data;
      
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
  onSubmit() {
   
    if (this.formGroup.valid) {
      var properties = [];
      var i=0;
      for (let control of this.formGroup.get('formArray1')['controls']) {
        var otherCurrency=[];
        for(let currency of control.controls["propertyOtherCurrency"].value){
          if(currency!=0){
            otherCurrency.push({"CurrencyID":currency});
          }        
        }
        var weekDayArr=[];
        for(let weekDay of control.controls["propertyWeekDays"].value){
          if(weekDay!=0){
            weekDayArr.push({"DayID":weekDay});
          }        
        }
        var weekEndArr=[];
        for(let weekEnd of control.controls["propertyWeekends"].value){
          if(weekEnd!=0){
            weekEndArr.push({"DayID":weekEnd});
          }        
        }
       
        var macIDArr=[];
        for(let macID of this.DataArray[i].macIDs){
         
          macIDArr.push({"MacAddress":macID.name});
           
        }
        var netWorkIPArr=[];
        for(let networkIP of this.DataArray[i].networkIPs){
         
          netWorkIPArr.push({"IPAddress":networkIP.name});
           
        }
        var groupData = {
          "GroupID": parseInt(this.holdingCompanyData.groupID),
          "HoldingCompanyID": parseInt(this.holdingCompanyData.holdingCompanyID),
          "Name": control.controls["propertyName"].value,
          "Code": control.controls["propertyCode"].value,
          "CityID": control.controls["propertyCity"].value,
          "StateId": control.controls["propertyState"].value,
          "CountryId": control.controls["propertyCountry"].value,
          "ZipCode": control.controls["propertyPinZip"].value,
          "PhoneNumber": control.controls["propertyPhone"].value,
          "Address": control.controls["propertyAddress"].value,
          "CreatedBy": "Sirojan",          
          "CheckInTime":this.convertTime(control.controls["propertyCheckIn"].value),
          "CheckOutTime":this.convertTime(control.controls["propertyCheckOut"].value),
          "StarRating":this.DataArray[i].rating,
          "Website": control.controls["propertyWebsite"].value,
          "CurrencyID":control.controls["propertyCurrency"].value,
          "HotelTypeID":control.controls["propertyHotelType"].value,
          "OtherCurrencies":otherCurrency,
          "PropertyWeekDays":weekDayArr,
          "PropertyWeekends":weekEndArr,
          "MacAddresses":macIDArr,
          "IPAddresses":netWorkIPArr
        }
        properties.push(groupData);
        
        i++;


      }
    console.log(properties);
      this.webService.commonMethod('property/post', { "properties": properties }, 'POST', null)
        .subscribe(data => {
          if (data.succeeded) {

            this.dialogRef.close({ event: 'close', data: this.holdingCompanyData });
          }
          else {
            this.toast.error(data.errors);
          }
        });
      
    }
    else {
      this.toast.error("form validation failed");
    }

  }
  convertTime(time:any): any{
    if(time){
      var time = time;
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if(AMPM == "PM" && hours<12) hours = hours+12;
      if(AMPM == "AM" && hours==12) hours = hours-12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if(hours<10) sHours = "0" + sHours;
      if(minutes<10) sMinutes = "0" + sMinutes;
  
      return (sHours + ":" + sMinutes);
    }else{
      return null;
    }
  

  }

}
