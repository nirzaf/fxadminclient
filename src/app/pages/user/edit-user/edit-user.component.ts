import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import  *  as  gender  from  'src/app/shared/data/gender.json';
import  *  as  title  from  'src/app/shared/data/title.json';
import  *  as  passwordExpiry  from  'src/app/shared/data/passwordexpiry.json';
import { CreateUserComponent } from '../create-user/create-user.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UserData } from '../view-user/view-user.component';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
export interface DialogData {

}
export interface NetworkIP {
  name: string;
}
export interface Company {
  companyName:string;
  holdingCompanyID:number;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  holdingCompanyID:any;
  savedUserID:any;
  errorMsg: string;
  saveSuccess=false;
  SelectedCompany:Company={companyName:null,holdingCompanyID:0};
  isLoading = false;
  public loaderMessage: string = "Loading...";
  holdingCompanies: any;

  createUserForm: FormGroup = this.formBuilder.group({
    'holdingCompanyName': new FormControl(null, Validators.required),
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
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,private formBuilder: FormBuilder,private webService:WebService,private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public _userData: UserData,private http: HttpClient) {
    this.getDepartmentList();
    this.getUserTypeList();
    this.getDesignationList();
    this.getCountryList();
    this.getUserData(_userData.userID);
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
  OnCompanySelect(SelectedCompany) {
    this.holdingCompanyID=SelectedCompany.holdingCompanyID;
    //this.getUserProductListByUser(SelectedUserProduct.userID);
    console.log("Onchange");
    console.log(SelectedCompany);
  }
  displayFn(company?: any): string | undefined {
    console.log("displayFn");
    console.log(company);
    return company ? company.companyName: undefined;
  }
  close(): void {

    this.dialogRef.close({ event: 'close', data: null });
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
        "UserID":this._userData.userID,
        "HoldingCompanyID": parseInt(this.holdingCompanyID),
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
      this.webService.commonMethod('user/put/'+this._userData.userID,userData, 'PUT', null)
      .subscribe(data => {
        if (data.succeeded) {
          if (data.data == 0) {
            this.toast.error("Some Error Occured");
          }
          else {
            //this.toast.success("Data Saved Successfully");
            //this.linkProperty=true;
            // this.holdingCompanyData.holdingCompanyID = data.data;
            // this.holdingCompanyData.holdingCompanyName = '';
            this.dialogRef.close({ event: 'close', data: 1});

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
  getUserData(userID){
    //console.log(this.dayListArr);
    this.webService.commonMethod('user/GetById/'+userID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
      //this.userObj=data.data;
     

        //this.userObj.titleName=this.getTitleNameById(data.data.titleID)[0].name;
        //this.userObj.genderName=this.getGenderNameById(data.data.genderID)[0].name;
        var isLicense="0";

        if(data.data.isAuthorized){
          isLicense="1";
        }
        // this.SelectedCompany.companyName=data.data.holdingCompanyName;
        // this.SelectedCompany.holdingCompanyID=data.data.holdingCompanyID;
        this.holdingCompanyID=data.data.holdingCompanyID;
        this.createUserForm.get('holdingCompanyName').setValue({companyName:data.data.holdingCompanyName, holdingCompanyID:data.data.holdingCompanyID});
        this.createUserForm.get('alias').setValue(data.data.alias);
        this.createUserForm.get('title').setValue(data.data.titleID);
        this.createUserForm.get('lastName').setValue(data.data.lastName);
        this.createUserForm.get('middleName').setValue(data.data.middleName);
        this.createUserForm.get('firstName').setValue(data.data.firstName);
        this.createUserForm.get('gender').setValue(data.data.genderID);
        this.createUserForm.get('designation').setValue(data.data.designationID);
        this.createUserForm.get('department').setValue(data.data.departmentID);
        this.createUserForm.get('userValidFrom').setValue(data.data.validFrom);
        this.createUserForm.get('userValidTo').setValue(data.data.validTo);
        //this.createUserForm.get('profilePicture').setValue(data.data.userImageName);
        this.createUserForm.get('userType').setValue(data.data.userTypeID);
        this.createUserForm.get('loginID').setValue(data.data.loginID);
        this.createUserForm.get('passwordExpiry').setValue(data.data.passwordExpiryDays);
        this.createUserForm.get('officeAddress').setValue(data.data.officeAddress);
        this.createUserForm.get('officeCountry').setValue(data.data.officeCountryID);
        this.createUserForm.get('officeCity').setValue(data.data.officeCityID);
        this.createUserForm.get('officeState').setValue(data.data.officeStateID);
        this.createUserForm.get('officePostalCode').setValue(data.data.officeZipCode);
        this.createUserForm.get('officePhoneCountryCode').setValue(data.data.officePhoneCountryCode);
        this.createUserForm.get('officePhoneNo').setValue(data.data.officePhone);
        this.createUserForm.get('officeMobileCountryCode').setValue(data.data.officeMobileCountryCode);
        this.createUserForm.get('officeMobileNumber').setValue(data.data.officeMobile);
        this.createUserForm.get('officeExtension').setValue(data.data.officeExtension);
        this.createUserForm.get('officeEmail').setValue(data.data.officeEmail);
        this.createUserForm.get('personalAddress').setValue(data.data.personalAddress);
        this.createUserForm.get('personalCountry').setValue(data.data.persoanlCountryID);
        this.createUserForm.get('personalState').setValue(data.data.personalStateID);
        this.createUserForm.get('personalCity').setValue(data.data.personalCityID);
        this.createUserForm.get('personalPostalCode').setValue(data.data.personalZipCode);
        this.createUserForm.get('personalMobileCountryCode').setValue(data.data.personalMobileCountryCode);
        this.createUserForm.get('personalMobileNumber').setValue(data.data.personalMobileNo);
        this.createUserForm.get('personalExtension').setValue(data.data.personalExtension);
        this.createUserForm.get('personalPhoneCountryCode').setValue(data.data.personalPhoneCountryCode);
        this.createUserForm.get('personalPhoneNumber').setValue(data.data.personalPhoneNumber);
        this.createUserForm.get('userBirthDate').setValue(data.data.birthDate);
        this.createUserForm.get('remarks').setValue(data.data.remarks);
        this.createUserForm.get('isAuthorizedLicense').setValue(isLicense);
        
        this.imgURL=data.data.imageVirtualPath;
        console.log("Image Path");
       console.log(this.imgURL);
       
  
        if(data.data.ipAddress){
         
          var tempArr=data.data.ipAddress.split(',');
          this.networkIPs=    tempArr.map(function(val) {
         
            return {name:val};
          });
        }
        if(data.data.macAddress){
          var macTempArr=data.data.macAddress.split(',');
         
          this.macIDs=    macTempArr.map(function(val) {
         
            return {name:val};
          });
        }      
       
      }
      else{
        this.toast.error(data.errors);
      }   
      
    });
  }
}
