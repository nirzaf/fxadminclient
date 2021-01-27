import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export interface DialogData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}

@Component({
  selector: 'app-add-holdingcompany',
  templateUrl: './add-holdingcompany.component.html',
  styleUrls: ['./add-holdingcompany.component.scss']
})

export class AddHoldingcompanyComponent {
  addCompanyForm: FormGroup = this.formBuilder.group({
    holdingCompanyName: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyCode: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyAddress: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    holdingCompanyPinZip: [, { validators: [Validators.required], updateOn: "change" }],
    holdingCompanyPhone: [, { validators: [Validators.required], updateOn: "change" }],


  });


  country: any = 0;
  city: any = 0;
  state: any = 0;
  public cityList: any = [];
  public stateList: any = [];
  public countryList: any = [];
  constructor(
    public dialogRef: MatDialogRef<AddHoldingcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public holdingCompanyData: DialogData, private webService: WebService, private toast: ToastService, private formBuilder: FormBuilder) {

    this.getCountryList();

  }
  submitForm(): void {
    if (this.addCompanyForm.valid) {
      var postData = {
        "Name": this.addCompanyForm.controls['holdingCompanyName'].value,
        "Code": this.addCompanyForm.controls['holdingCompanyCode'].value,
        "CityId": this.addCompanyForm.controls['holdingCompanyCity'].value,
        "StateId": this.addCompanyForm.controls['holdingCompanyState'].value,
        "CountryId": this.addCompanyForm.controls['holdingCompanyCountry'].value,
        "ZipCode": this.addCompanyForm.controls['holdingCompanyPinZip'].value,
        "PhoneNumber": this.addCompanyForm.controls['holdingCompanyPhone'].value,
        "Address": this.addCompanyForm.controls['holdingCompanyAddress'].value,
        "CreatedBy": "Sirojan",
        "IsActive": true,
        "ModifiedBy": "Sirojan",

      }
      this.webService.commonMethod('holdingcompany/post', postData, 'POST', null)
        .subscribe(data => {
          if (data.succeeded) {
            if (data.data == 0) {
              this.toast.error("Code must be unique");
            }
            else {
              this.holdingCompanyData.holdingCompanyID = data.data;
              this.holdingCompanyData.holdingCompanyName = '';
              this.dialogRef.close({ event: 'close', data: this.holdingCompanyData });

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
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: this.holdingCompanyData });
  }
  getCityList(stateID) {
    this.webService.commonMethod('city/get/' + stateID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.cityList = data.data;


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
  getStateList(countryID) {

    this.webService.commonMethod('state/get/' + countryID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.stateList = data.data;
          this.cityList = [];

        }
        else {
          this.toast.error(data.errors);
          this.stateList = [];
        }


      });
  }


}
