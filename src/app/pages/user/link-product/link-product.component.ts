import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
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

  linkPropertyForm: FormGroup = this.formBuilder.group({
    defaultGroupName: [, { validators: [Validators.required], updateOn: "change" }],
    defaultPropertyName: [, { validators: [Validators.required], updateOn: "change" }],
    


  });

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,private fb: FormBuilder,private webService: WebService, private toast: ToastService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.getCompanyGroupList(35);


  }
 

  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }


 




 
 

getCompanyGroupList(holdingCompanyID) {
  this.webService.commonMethod('group/getbycompany/' + holdingCompanyID, null, 'GET', null)
    .subscribe(data => {
      if (data.succeeded) {
         this.groupList= data.data;
      } else {
        this.toast.error(data.errors);
      }

    });
}
getPropertyList(groupID) {

  this.webService.commonMethod('property/getbygroup/' + groupID, null, 'GET', null)
    .subscribe(data => {
      if (data.succeeded) {
      this.propertyList = data.data;
      }
      else {
        //this.propertyData = [];
        this.toast.error(data.errors);
      }


    });
}
onSubmit(form){
  console.log(form);
}
}
