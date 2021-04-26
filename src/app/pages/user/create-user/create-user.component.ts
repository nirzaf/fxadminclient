import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import  *  as  gender  from  'src/app/shared/data/gender.json';
import  *  as  title  from  'src/app/shared/data/title.json';
import  *  as  passwordExpiry  from  'src/app/shared/data/passwordexpiry.json';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';

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
  errorMsg: string;
  SelectedCompany:any;
  isLoading = false;
  public isProgressing: boolean = true;
  public loaderMessage: string = "Loading...";
  holdingCompanies: any;
  createUserForm: FormGroup = this.formBuilder.group({
    holdingCompanyName: [],
    alias: [, { validators: [Validators.required], updateOn: "change" }],
    title: [, { validators: [Validators.required], updateOn: "change" }],
    lastName: [, { validators: [], updateOn: "change" }],
    middleName: [, { validators: [], updateOn: "change" }],
    firstName: [, { validators: [], updateOn: "change" }],
    gender: [, { validators: [], updateOn: "change" }],
    designation:[, { validators: [], updateOn: "change" }],
    department:[, { validators: [], updateOn: "change" }],
    userValidFrom:[, { validators: [], updateOn: "change" }],
    userValidTo:[, { validators: [], updateOn: "change" }],
    profilePicture:[, { validators: [], updateOn: "change" }],
    userType:[, { validators: [], updateOn: "change" }],
    loginID:[, { validators: [], updateOn: "change" }],
    passwordExpiry:[, { validators: [], updateOn: "change" }],
    propertyNetworkIP:[, { validators: [], updateOn: "change" }],
    propertyMacID:[, { validators: [], updateOn: "change" }],
    isAuthorizedLicense:[, { validators: [], updateOn: "change" }],
    officeAddress:[, { validators: [], updateOn: "change" }],
    officeCountry:[, { validators: [], updateOn: "change" }],
    officeState:[, { validators: [], updateOn: "change" }],
    officeCity:[, { validators: [], updateOn: "change" }],
    officePostalCode:[, { validators: [], updateOn: "change" }],
    officeMobileCountryCode:[, { validators: [], updateOn: "change" }],
    officeMobileNumber:[, { validators: [], updateOn: "change" }],
    officePhoneCountryCode:[, { validators: [], updateOn: "change" }],
    officePhoneNo:[, { validators: [], updateOn: "change" }],
    officeExtension:[, { validators: [], updateOn: "change" }],
    officeEmail:[, { validators: [], updateOn: "change" }],
    personalAddress:[, { validators: [], updateOn: "change" }],
    personalCountry:[, { validators: [], updateOn: "change" }],
    personalState:[, { validators: [], updateOn: "change" }],
    personalCity:[, { validators: [], updateOn: "change" }],
    personalPostalCode:[, { validators: [], updateOn: "change" }],
    personalMobileCountryCode:[, { validators: [], updateOn: "change" }],
    personalMobileNumber:[, { validators: [], updateOn: "change" }],
    personalPhoneCountryCode:[, { validators: [], updateOn: "change" }],
    personalPhoneNumber:[, { validators: [], updateOn: "change" }],
    personalExtension:[, { validators: [], updateOn: "change" }],
    userBirthDate:[, { validators: [], updateOn: "change" }],
    remarks:[, { validators: [], updateOn: "change" }],
   


  });
  public imagePath;
  imgURL: any;
  public message: string;
 
  OnUserProductSelect(SelectedUserProduct) {
    //this.getUserProductListByUser(SelectedUserProduct.userID);
    console.log("Onchange");
    console.log(SelectedUserProduct);
  }

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
  genderList= (gender  as  any).default;
  titleList= (title  as  any).default;
  passWorldExpiryList= (passwordExpiry  as  any).default;
  public departmentList: any = [];
  public userTypeList: any = [];
  public designationList: any = [];
  public personalStateList: any = [];
  public offcialStateList: any = [];
  public personalCityList: any = [];
  public officialCityList: any = [];
  public countryList: any = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,private formBuilder: FormBuilder,private webService:WebService,private toast: ToastService
    ,private http: HttpClient) {
    this.getDepartmentList();
    this.getUserTypeList();
    this.getDesignationList();
    this.getCountryList();
       }

  ngOnInit(): void {
    this.createUserForm.get('holdingCompanyName').valueChanges
    .pipe(
       
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.holdingCompanies = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get(`https://localhost:44358/api/v1/user/searchcompany/${value ? value: 'NAN'}`  )
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      if (data == undefined) {
        this.errorMsg = data['Error'];
        this.holdingCompanies = [];
      } else {
        this.errorMsg = "";
        this.holdingCompanies = data["data"];
      }

      console.log(this.holdingCompanies);
    });
    
  }
  preview(files) {
    if (files.length === 0)
      return;
      const file = files[0];
      if (file == undefined) return;
     
      let formData = new FormData();
      formData.append('document', files[0], files[0].name);
      this.webService.UploadDocument("file/upload",formData).
      subscribe(data => {
        this.imgURL = data; 
          console.log(data);
      })
    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }
 
    // var reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]); 
    // reader.onload = (_event) => { 
    //   this.imgURL = reader.result; 
    // }
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

  submitFormtest(){
    this.linkProperty=true;
  }
  // UploadDocument(url: string, data: any) {
  //   let url_type: string = "Config";
  //   let headers = {
  //     headers: new HttpHeaders({
  //       'enctype': 'multipart/form-data',
  //       'Authorization': 'bearer ' + this.optoken
  //     })
  //   };
  //   return this.http.post(this.URL[url_type] + '/' + url, data, headers);
 
  // }
  submitForm(){
    if (this.createUserForm.valid) {
      var isLicense=false;

      if(this.createUserForm.controls['isAuthorizedLicense'].value=="1"){
        isLicense=true;
      }
      var MacIds =  this.macIDs.map(function(val) {
        return val.name;
      }).join(',');
      var netWorkIPs =   this.networkIPs.map(function(val) {
        return val.name;
      }).join(',');

      const postData = new FormData();
// postData.append('HoldingCompanyID', data.title);
// postData.append('description', data.description);
// postData.append('image', data.image);
var imageName=null;
if(this.imgURL!=null && this.imgURL!=""){
  imageName=this.imgURL.substr(this.imgURL.lastIndexOf("/") + 1);
}
      var userData = {
        "HoldingCompanyID": parseInt(this.createUserForm.controls['holdingCompanyName'].value),
        "Alias":this.createUserForm.controls['alias'].value,
        "TitleID":this.createUserForm.controls['title'].value,
        "LastName": this.createUserForm.controls['lastName'].value,
        "MiddleName": this.createUserForm.controls['middleName'].value,
        "FirstName": this.createUserForm.controls['firstName'].value,
        "GenderID": this.createUserForm.controls['gender'].value,
        "DesignationID": this.createUserForm.controls['designation'].value,
        "DepartmentID": this.createUserForm.controls['department'].value,
        "ValidFrom": this.createUserForm.controls['userValidFrom'].value,
        "ValidTo": this.createUserForm.controls['userValidTo'].value,          
        //"UserImageName":this.createUserForm.controls['profilePicture'].value,
        "IsAuthorized":isLicense,
        "UserTypeID":this.createUserForm.controls['userType'].value,
        "LoginID": this.createUserForm.controls['loginID'].value,
        "PasswordExpiryDays":this.createUserForm.controls['passwordExpiry'].value,
        "OfficeAddress":this.createUserForm.controls['officeAddress'].value,
        "OfficeCountryID":this.createUserForm.controls['officeCountry'].value,
        "OfficeCityID":this.createUserForm.controls['officeCity'].value,
        "OfficeStateID":this.createUserForm.controls['officeState'].value,
        "OfficeZipCode":this.createUserForm.controls['officePostalCode'].value,
        "OfficePhoneCountryCode":this.createUserForm.controls['officePhoneCountryCode'].value,
        "OfficePhone":this.createUserForm.controls['officePhoneNo'].value,
        "OfficeMobileCountryCode":this.createUserForm.controls['officeMobileCountryCode'].value,
        "OfficeMobile":this.createUserForm.controls['officeMobileNumber'].value,
        "OfficeExtension":this.createUserForm.controls['officeExtension'].value,
        "OfficeEmail":this.createUserForm.controls['officeEmail'].value,
        "PersonalAddress":this.createUserForm.controls['personalAddress'].value,
        "PersoanlCountryID":this.createUserForm.controls['personalCountry'].value,
        "PersonalStateID":this.createUserForm.controls['personalState'].value,
        "PersonalCityID":this.createUserForm.controls['personalCity'].value,
        "PersonalZipCode":this.createUserForm.controls['personalPostalCode'].value,
        "PersonalMobileCountryCode":this.createUserForm.controls['personalMobileCountryCode'].value,
        "PersonalMobileNo":this.createUserForm.controls['personalMobileNumber'].value,
        "PersonalExtension":this.createUserForm.controls['personalExtension'].value,
        "PersonalPhoneCountryCode":this.createUserForm.controls['personalPhoneCountryCode'].value,
        "PersonalPhoneNumber":this.createUserForm.controls['personalPhoneNumber'].value,
        "BirthDate":this.createUserForm.controls['userBirthDate'].value,
        "Remarks":this.createUserForm.controls['remarks'].value,
        "UserImageName":imageName,
        // "ImagePhysicalPath":this.createUserForm.controls['holdingCompanyName'].value,
        "ImageVirtualPath":this.imgURL,
        // "FileName":this.createUserForm.controls['holdingCompanyName'].value,
        "CreatedBy":"Sirojan",
        "MacAddress":MacIds,
        "IPAddress":netWorkIPs
       
      }
      this.webService.commonMethod('user/post', userData, 'POST', null)
      .subscribe(data => {
        if (data.succeeded) {
          if (data.data == 0) {
            this.toast.error("Some Error Occured");
          }
          else {
            this.toast.success("Data Saved Successfully");
            this.linkProperty=true;
            // this.holdingCompanyData.holdingCompanyID = data.data;
            // this.holdingCompanyData.holdingCompanyName = '';
            //this.dialogRef.close({ event: 'close', data: null});

          }

        }
        else {
          this.toast.error(data.errors);
        }




      });
    }

  }

  getDepartmentList() {
    this.webService.commonMethod('department/get?pageSize=100', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.departmentList = data.data;
          //this.DataArray[0].countryList = data.data;
      
        }
        else {
          //this.toast.error(data.errors);
        }

      });
  }
  getUserTypeList() {
    this.webService.commonMethod('userType/get?pageSize=100', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.userTypeList = data.data;
          //this.DataArray[0].countryList = data.data;
      
        }
        else {
          //this.toast.error(data.errors);
        }

      });
  }
  getDesignationList() {
    this.webService.commonMethod('designation/get?pageSize=100', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          
          this.designationList = data.data;
          //this.DataArray[0].countryList = data.data;
      
        }
        else {
          //this.toast.error(data.errors);
        }

      });
  }
  getCityList(stateID:any,type:any) {
    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          if(type=="p"){
            this.personalCityList=data.data;
            
          }else{
            this.officialCityList=data.data;
         
          }
        


        }
        else {
          this.toast.error(data.errors);
        }



      });
  }

  getCountryList() {
    this.webService.commonMethod('country/get?pageSize=100', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.countryList = data.data;


        }
        else {
          this.toast.error(data.errors);
        }
      });
  }
  getStateList(countryID:any,type:any) {

    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          if(type=="p"){
            this.personalStateList=data.data;
            this.personalCityList=[];
          }else{
            this.offcialStateList=data.data;
            this.officialCityList=[];
          }
      

        }
        else {
          this.toast.error(data.errors);
          if(type=="p"){
            this.personalStateList=[];
           
          }else{
            this.offcialStateList=[];
         
          }
      
        }


      });
  }

}
