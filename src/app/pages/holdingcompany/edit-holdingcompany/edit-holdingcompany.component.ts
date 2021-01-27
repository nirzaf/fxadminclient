import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
@Component({
  selector: 'app-edit-holdingcompany',
  templateUrl: './edit-holdingcompany.component.html',
  styleUrls: ['./edit-holdingcompany.component.scss']
})
export class EditHoldingcompanyComponent implements OnInit {
  editCompanyForm: FormGroup = this.formBuilder.group({
    holdingCompanyName: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyCode: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyAddress: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyPinZip: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyPhone: [, { validators: [Validators.required], updateOn: "change" }],

  });
  holdingCompanyData: CompanyData;
  country: any = 0;
  city: any = 0;
  state: any = 0;
  public cityList: any = [];
  public stateList: any = [];
  public countryList: any = [];
  constructor(public dialogRef: MatDialogRef<EditHoldingcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: CompanyData, private webService: WebService, private toast: ToastService, private formBuilder: FormBuilder) {
    this.holdingCompanyData = _holdingCompanyData;
    this.getHoldingCompanyData(_holdingCompanyData.holdingCompanyID);

    this.getCountryList();
  }

  ngOnInit(): void {
  }
  close(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }
  getCityList(stateID: string, isInitial: boolean) {
    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.cityList = data.data;
          if (!isInitial) {
            this.editCompanyForm.get('holdingCompanyCity').setValue(0);
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
  getStateList(countryID: string, isInitial: boolean) {
    this.cityList = [];
    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.stateList = data.data;

          if (!isInitial) {
         
            this.editCompanyForm.get('holdingCompanyCity').setValue(0);
            this.editCompanyForm.get('holdingCompanyState').setValue(0);
          }
        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }



      });
  }
  getHoldingCompanyData(holdingCompanyID) {
    this.webService.commonMethod('holdingcompany/get/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {

          this.editCompanyForm.get('holdingCompanyCode').setValue(data.data.code);
          this.editCompanyForm.get('holdingCompanyName').setValue(data.data.name);
          this.editCompanyForm.get('holdingCompanyAddress').setValue(data.data.address);
          this.editCompanyForm.get('holdingCompanyCountry').setValue(data.data.countryId);

          this.editCompanyForm.get('holdingCompanyState').setValue(data.data.stateId);

          this.editCompanyForm.get('holdingCompanyCity').setValue(data.data.cityId);
          this.getStateList(data.data.countryId, true);
          this.getCityList(data.data.stateId, true);
          this.editCompanyForm.get('holdingCompanyPinZip').setValue(data.data.zipCode);
          this.editCompanyForm.get('holdingCompanyPhone').setValue(data.data.phoneNumber);


        }
        else {
          this.toast.error(data.errors);
        }

      });
  }
  submitForm(): void {
    
    if (this.editCompanyForm.valid) {
      
      var postData = {
        "HoldingCompanyID": this.holdingCompanyData.holdingCompanyID,
        "Name": this.editCompanyForm.controls['holdingCompanyName'].value,
        "Code": this.editCompanyForm.controls['holdingCompanyCode'].value,
        "CityId": this.editCompanyForm.controls['holdingCompanyCity'].value,
        "StateId": this.editCompanyForm.controls['holdingCompanyState'].value,
        "CountryId": this.editCompanyForm.controls['holdingCompanyCountry'].value,
        "ZipCode": this.editCompanyForm.controls['holdingCompanyPinZip'].value,
        "PhoneNumber": this.editCompanyForm.controls['holdingCompanyPhone'].value,
        "Address": this.editCompanyForm.controls['holdingCompanyAddress'].value,
        "ModifiedBy": "Sirojan",

      }
      this.webService.commonMethod('holdingcompany/put/' + this.holdingCompanyData.holdingCompanyID, postData, 'PUT', null)
        .subscribe(data => {
          if (data.succeeded) {
            if (data.data == 0) {
              this.toast.error("Code Must be unique");
            }
            else if (data.data = 1) {
              this.dialogRef.close({ event: 'close', data: 1 });
            }

          }
          else {

            this.toast.error(data.errors);
          }



        });
    } else {
      return;
    }

  }

}
