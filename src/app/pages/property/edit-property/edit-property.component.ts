import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
export interface PropertyData {
  propertyID: string;
  propertyName: string;
  groupID:string;
  groupName:string;
  holdingCompanyID:string;
  holdingCompanyName:string;
  propertyIndex:number;

}
export interface NetworkIP {
  name: string;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {

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
 
  countryList = [];
  currencyList=[];
  dayList=[];
  
  hotelTypeList=[];
  cityList = [];
  stateList = [];
  formGroup: FormGroup;
  propertyData: PropertyData;
  DataObj = {

    countryList: this.countryList,
    stateList: [],
    cityList: [],
    
    propertyState:0,
    propertyCity:0,
    propertyCountry:0,
    dayList:this.dayList,
    currencyList:this.currencyList,
    propertyCurrency:[],
    propertyOtherCurrency:[],
    propertyWeekends:[],
    propertyWeekDays:[],
    propertyHotelType:0,
    
    networkIPs:[],
    
    rating:0,
    hotelTypeList:this.hotelTypeList,
    macIDs:[]
  };
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

 
  value = this.fb.group({

  });
  public validate(): void {
   
    this.formGroup = this.fb.group({
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
      propertyCurrency: [0, { validators: [], updateOn: "change" }],
      propertyOtherCurrency: [, { validators: [Validators.required], updateOn: "change" }],
      propertyNetworkIP: [, { validators: [], updateOn: "change" }],
      propertyMacAddress: [, { validators: [], updateOn: "change" }],
    });
   
   
  }



 

 
  addNetworkIP(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

  
    // Add our fruit
    if ((value || '').trim()) {
      this.DataObj.networkIPs.push({ name: value.trim() });
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeNetworkIP(networkIP: NetworkIP): void {
    
    
    const index = this.DataObj.networkIPs.indexOf(networkIP);

    if (index >= 0) {
      this.DataObj.networkIPs.splice(index, 1);
    }
  }
  addMacID(event: MatChipInputEvent): void {
    
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.DataObj.macIDs.push({ name: value.trim() });
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMacID(macID: MacID): void {

    const index = this.DataObj.macIDs.indexOf(macID);
    if (index >= 0) {
      this.DataObj.macIDs.splice(index, 1);
    }
  }
  


  constructor(
    public dialogRef: MatDialogRef<EditPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertyData, private fb: FormBuilder,private webService:WebService,private toast: ToastService) {
    this.propertyData=data;
    this.getPropertyData(data.propertyID);
    this.getCountryList();
    this.getCurrencyList();
    this.getHotelTypeList();
    this.getDayList();
  }
  ngOnInit() {
    this.validate();
  }
  onRatingChanged(rating) {
 
    this.DataObj.rating = rating;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getCityList(stateID,isInitial) {

    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
     
          this.DataObj.cityList = data.data;
          if(!isInitial){
            this.DataObj.propertyCity=0;
          }
          
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
          this.DataObj.countryList = data.data;
      
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
          this.DataObj.currencyList = data.data;
      
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
          this.DataObj.hotelTypeList = data.data;
      
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
          this.DataObj.dayList=data.data.map(function(a) {   
         
            return {dayID:a.dayID,name:a.name}
          }
          );
          //this.DataObj.dayList = data.data;
      
        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  getStateList(countryID,isInitial) {

 

    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
    
       
          this.DataObj.stateList = data.data;
         // item.value.groupState = 0;
         if(!isInitial){
          this.DataObj.propertyState=0;
         }
         

        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }


   
      
      });
  }
  submitForm() {
   
    if (this.formGroup.valid) {


  
        var otherCurrency=[];
        for(let currency of this.formGroup.controls["propertyOtherCurrency"].value){
          if(currency!=0){
            otherCurrency.push({"CurrencyID":currency});
          }        
        }
        var weekDayArr=[];
        for(let weekDay of this.formGroup.controls["propertyWeekDays"].value){
          if(weekDay!=0){
            weekDayArr.push({"DayID":weekDay});
          }        
        }
        var weekEndArr=[];
        for(let weekEnd of this.formGroup.controls["propertyWeekends"].value){
          if(weekEnd!=0){
            weekEndArr.push({"DayID":weekEnd});
          }        
        }
       
        var macIDArr=[];
        for(let macID of this.DataObj.macIDs){
         
          macIDArr.push({"MacAddress":macID.name});
           
        }
        var netWorkIPArr=[];
        for(let networkIP of this.DataObj.networkIPs){
         
          netWorkIPArr.push({"IPAddress":networkIP.name});
           
        }
        var propertyData = {
          "PropertyID": parseInt(this.propertyData.propertyID),
          "Name": this.formGroup.controls["propertyName"].value,
          "Code": this.formGroup.controls["propertyCode"].value,
          "CityID": this.formGroup.controls["propertyCity"].value,
          "StateId": this.formGroup.controls["propertyState"].value,
          "CountryId": this.formGroup.controls["propertyCountry"].value,
          "ZipCode": this.formGroup.controls["propertyPinZip"].value,
          "PhoneNumber": this.formGroup.controls["propertyPhone"].value,
          "Address": this.formGroup.controls["propertyAddress"].value,
          "CreatedBy": "Sirojan",          
          "StarRating":this.DataObj.rating,
          "Website": this.formGroup.controls["propertyWebsite"].value,
          "CurrencyID":this.formGroup.controls["propertyCurrency"].value,
          "HotelTypeID":this.formGroup.controls["propertyHotelType"].value,
          "OtherCurrencies":otherCurrency,
          "PropertyWeekDays":weekDayArr,
          "PropertyWeekends":weekEndArr,
          "MacAddresses":macIDArr,
          "IPAddresses":netWorkIPArr,
          "ModifiedBy":"Sirojan"
        }
        //properties.push(groupData);
        



      
    console.log(propertyData);
      this.webService.commonMethod('property/put/'+parseInt(this.propertyData.propertyID), { "property":propertyData }, 'PUT', null)
        .subscribe(data => {
          if (data.succeeded) {

            this.dialogRef.close({ event: 'close', data: 1 });
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
  getPropertyData(propertyID){
    this.webService.commonMethod('property/get/'+propertyID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        var responseData=data.data;
        this.DataObj.macIDs =responseData.macAddresses.map(function(a) {   
         
          return {name:a.macAddress}
        }
        );
        this.DataObj.networkIPs =responseData.networkIPs.map(function(a) {   
         
          return {name:a.ipAddress}
        }
        );
        this.formGroup.get('propertyCode').setValue(data.data.code);
        this.formGroup.get('propertyName').setValue(data.data.name);
        this.formGroup.get('propertyAddress').setValue(data.data.address);
        this.formGroup.get('propertyCountry').setValue(data.data.countryID);
        this.DataObj.rating=data.data.starRating;
        this.formGroup.get('propertyState').setValue(data.data.stateID);
    
        this.formGroup.get('propertyCity').setValue(data.data.cityID);
        this.getStateList(data.data.countryID,true);
        this.getCityList(data.data.stateID,true);
        this.formGroup.get('propertyPinZip').setValue(data.data.zipCode);
        this.formGroup.get('propertyPhone').setValue(data.data.phoneNumber);
        this.formGroup.get('propertyHotelType').setValue(data.data.hotelTypeID);
        this.formGroup.get('propertyCheckIn').setValue(data.data.checkInTime);
        this.formGroup.get('propertyCheckOut').setValue(data.data.checkOutTime);
        this.formGroup.get('propertyWebsite').setValue(data.data.website);
        this.DataObj.propertyWeekDays=responseData.weekDays.map(function(a) {   
         
          return a.dayID;
        }
        );
        this.DataObj.propertyWeekends=responseData.weekend.map(function(a) {   
         
          return a.dayID;
        }
        );
        this.formGroup.get('propertyCurrency').setValue(data.data.currencyID);
       
        this.DataObj.propertyOtherCurrency=responseData.otherCurrencies.map(function(a) {   
         
          return a.currencyID;
        }
        );
        this.formGroup.get('propertyOtherCurrency').setValue(this.DataObj.propertyOtherCurrency);
        this.formGroup.get('propertyWeekends').setValue(this.DataObj.propertyWeekends);
        this.formGroup.get('propertyWeekDays').setValue(this.DataObj.propertyWeekDays);
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  close(): void {
   
    this.dialogRef.close( { event: 'close', data: null });
  }

}
