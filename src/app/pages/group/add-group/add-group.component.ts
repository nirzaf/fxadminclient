import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { getgroups } from 'process';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface DialogData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})

export class AddGroupComponent {
  panelOpenState = false;
  defaultGroupCode: any = "aaa";
  public GroupList: any = [];
  orders = [];
  DataArray = [];
  countryList = [];
  cityList = [];
  stateList = [];
  country: any = 0;
  city: any = 0;
  state: any = 0;
  formGroup: FormGroup;
  holdingCompanyData: DialogData;
  value = this.fb.group({

  });


  ngOnInit() {
    this.validate();



  }
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
      groupState:0,
      groupCity:0,
      groupCountry:0,

    })
 
    return this.fb.group({

      groupName: [, { validators: [Validators.required], updateOn: "change" }],
      groupCode: [, { validators: [Validators.required], updateOn: "change" }],
      groupAddress: [, { validators: [Validators.required], updateOn: "change" }],
      groupCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      groupState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      groupCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
      groupPinZip: [, { validators: [Validators.required], updateOn: "change" }],
      groupPhone: [, { validators: [Validators.required], updateOn: "change" }],

      countryList: this.fb.array(this.countryList),
      stateList: this.fb.array([]),
      cityList: this.fb.array([]),





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
  resetForm() {
    this.formGroup.reset();
    var i=0;
    for (let control of this.formGroup.get('formArray1')['controls']) {
      control.controls["groupCountry"].setValue(0);
      control.controls["groupState"].setValue(0);
      control.controls["groupCity"].setValue(0);
      this.DataArray[i].stateList=[];
      this.DataArray[i].cityList=[];
      
      i++;
    }
   
   
  }
  trackByFn(index: any, item: any) {
    return index;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      var groups = [];
      for (let control of this.formGroup.get('formArray1')['controls']) {
        var groupData = {
          "HoldingCompanyID": this.holdingCompanyData.holdingCompanyID,
          "Name": control.controls["groupName"].value,
          "Code": control.controls["groupCode"].value,
          "CityID": control.controls["groupCity"].value,
          "StateId": control.controls["groupState"].value,
          "CountryId": control.controls["groupCountry"].value,
          "ZipCode": control.controls["groupPinZip"].value,
          "PhoneNumber": control.controls["groupPhone"].value,
          "Address": control.controls["groupAddress"].value,
          "CreatedBy": "Sirojan",
          "IsActive": true,
          "ModifiedBy": "Sirojan",

        }
        groups.push(groupData);
        ;


      }
    
      this.webService.commonMethod('group/post', { "Groups": groups }, 'POST', null)
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
      return;
    }

  }

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: DialogData, private fb: FormBuilder, private webService: WebService, private toast: ToastService) {
    this.getCountryList();
    this.holdingCompanyData = _holdingCompanyData;
  }

  getCityList(stateID, i) {

    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
     
          this.DataArray[i].cityList = data.data;
          this.DataArray[i].groupCity=0;
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
          this.DataArray[0].countryList = data.data;
          this.countryList = data.data;
          console.log(this.formGroup.value);
          this.formGroup.value.formArray1[0].countryList = data.data;
      
        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  getStateList(countryID, i) {
    var arrayControl = this.formGroup.get('formArray1') as FormArray;
    var item = arrayControl.at(i);
 
    console.log(countryID);
    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          var arrayControl = this.formGroup.get('formArray1') as FormArray;
          var item = arrayControl.at(i);
          
          //this.formGroup.get('formArray1')['controls'][i]["groupState"]=0;
          this.DataArray[i].stateList = data.data;
         // item.value.groupState = 0;
          this.DataArray[i].groupState=0;

        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }


   
      
      });
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'close', data: this.holdingCompanyData });
  }



}
