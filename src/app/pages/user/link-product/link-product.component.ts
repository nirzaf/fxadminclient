import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-link-product',
  templateUrl: './link-product.component.html',
  styleUrls: ['./link-product.component.scss']
})
export class LinkProductComponent implements OnInit {
  PanelOpenState=true;
  formGroup: FormGroup;
  DataArray = [];
  groupList=[];
  propertyList=[];
  productList=[];

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }
//   public validate(): void {
//     this.formGroup = this.fb.group({
//       'formArray1': this.fb.array([
//         this.initX(true)
//       ])
//     });
   
//   }
//  // get f() { return this.formGroup.controls; }
//   public initX2(): FormGroup {
//     return this.fb.group({

//       propertyName: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCode: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyAddress: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyPinZip: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyPhone: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyHotelType: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyCheckIn: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCheckOut: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyWebsite: [, { validators: [Validators.required], updateOn: "change" }],      
//       propertyWeekends: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCurrency: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyOtherCurrency: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyNetworkIP: [, { validators: [], updateOn: "change" }],
//       propertyMacAddress: [, { validators: [], updateOn: "change" }],
     
//     });
//   }

//   public initX(panelState): FormGroup {

//     this.DataArray.push({
//       groupList: this.groupList,
//       propertyList: this.propertyList,
//       formArray2: this.fb.array([
//         this.initX2()
//       ]),
//       PanelOpenState: panelState,
//       propertyState:0,
//       propertyCity:0,
//       propertyCountry:0,
   
//       propertyCurrency:0,
//       propertyOtherCurrency:0,
//       propertyWeekends:0,
//       propertyWeekDays:0,
//       propertyHotelType:0,
      
//       networkIPs:[],
      
//       rating:0,
    
//       macIDs:[]

//     })
 
//     return this.fb.group({

//       propertyName: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCode: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyAddress: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyPinZip: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyPhone: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyHotelType: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyCheckIn: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCheckOut: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyWebsite: [, { validators: [Validators.required], updateOn: "change" }],      
//       propertyWeekends: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyCurrency: [0, { validators: [Validators.min(1)], updateOn: "change" }],
//       propertyOtherCurrency: [, { validators: [Validators.required], updateOn: "change" }],
//       propertyNetworkIP: [, { validators: [], updateOn: "change" }],
//       propertyMacAddress: [, { validators: [], updateOn: "change" }],
     
//     });
//   }
}
