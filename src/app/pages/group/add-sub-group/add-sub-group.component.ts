import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { getgroups } from 'process';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface DialogData {
  holdingCompanyID: string;
  holdingCompanyName: string;
  groupID: string;
  groupName: string;
}

@Component({
  selector: 'app-add-sub-group',
  templateUrl: './add-sub-group.component.html',
  styleUrls: ['./add-sub-group.component.scss']
})

export class AddSubGroupComponent  {
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
    // this.formGroup.valueChanges.subscribe(data => console.log(data));
  }
  get f() { return this.formGroup.controls; }

  public initX(panelState): FormGroup {

    this.DataArray.push({
      countryList: this.countryList,
      stateList: [],
      cityList: [],
      PanelOpenState: panelState,
      groupState:0,
      groupCity:0

    })
    
    //alert("calling...");
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
  public addX(): void {
    const control = <FormArray>this.f.formArray1;
    control.push(this.initX(false));
  }



  removeX(index) {
    const control = <FormArray>this.f.formArray1;
    control.removeAt(index);
    // const form = this.form.get('groups') as FormArray
    // form.removeAt(index);
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
          "ParentGroupID":this.holdingCompanyData.groupID,
          "Address": control.controls["groupAddress"].value,
          "CreatedBy": "Sirojan",
          "IsActive": true,
          "ModifiedBy": "Sirojan",

        }
        groups.push(groupData);
        ;


      }
      console.log(groups);
      this.webService.commonMethod('group/post', { "Groups": groups }, 'POST', null)
        .subscribe(data => {
          if (data.succeeded) {
            console.log(data);
            // //this.countryList=data.data;
            // this.holdingCompanyData.holdingCompanyID=data.data.holdingCompanyID;
            // this.holdingCompanyData.holdingCompanyName=data.data.name;
            this.dialogRef.close({ event: 'close', data: this.holdingCompanyData });
          }
          else {
            this.toast.error(data.errors);
          }


          //console.log(data);
          //this.isProgressing = false;
        });
      // ...

      console.log("form submitted");
      console.log(this.formGroup.value);
    }
    else {
      return;
    }
    // console.log('value: ', this.form.value);
    // console.log('valid: ', this.form.valid);
  }

  constructor(
    public dialogRef: MatDialogRef<AddSubGroupComponent >,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: DialogData, private fb: FormBuilder, private webService: WebService, private toast: ToastService) {
    this.getCountryList();
    this.holdingCompanyData = _holdingCompanyData;
  }

  getCityList(stateID, i) {

    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          // var arrayControl = this.formGroup.get('formArray1') as FormArray;
          // var item = arrayControl.at(i);
          // item.value.stateList=state;
          // item.value.cityList=data.data;
          this.DataArray[i].cityList = data.data;
          this.DataArray[i].groupCity=0;
        }
        else {
          this.toast.error(data.errors);
        }


        console.log(data);
        //this.isProgressing = false;
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
          // var arrayControl = this.formGroup.get('formArray1') as FormArray;
          // var item = arrayControl.at(0);
          //arrayControl.at(0).value.countryList.patchValue(data.data);
          //  item.value.countryList=data.data;
          //arrayControl.setValue(item)
        }
        else {
          this.toast.error(data.errors);
        }


        console.log(data);
        //this.isProgressing = false;
      });
  }
  getStateList(countryID, i) {
    var arrayControl = this.formGroup.get('formArray1') as FormArray;
    var item = arrayControl.at(i);
    // item.value.groupCountry.setValue(countryID, {
    //   onlySelf: true
    // })
    console.log(countryID);
    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          var arrayControl = this.formGroup.get('formArray1') as FormArray;
          var item = arrayControl.at(i);
          console.log(item.value);
          //this.formGroup.get('formArray1')['controls'][i]["groupState"]=0;
          this.DataArray[i].stateList = data.data;
         // item.value.groupState = 0;
          this.DataArray[i].groupState=0;
          //console.log(arrayControl);



          // this.formGroup.value.patchValue({
          //   formArray1: arrayControl
          // })


          // this.formGroup.setValue({'formArray1':[arrayControl]});
        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }


        console.log(data);
        //this.isProgressing = false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
