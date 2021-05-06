import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import  *  as  access  from  'src/app/shared/data/access.json'; 
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {
  @Input() userID: any[];  
  @Input() holdingCompanyName: any[];  
  DataArray = [];
  groupList=[];
  propertyList=[];
  productList=[];
  accessList= (access  as  any).default;
  public formDummyData = [
    {
      name: 'akassh',
      product: ['9517532486', '9517532684']
    },
    {
      name: 'jain',
      product: ['9517532486', '9517532684']
    }
  ];
  public form: FormGroup;

  constructor(private fb: FormBuilder,private webService: WebService, private toast: ToastService,public dialogRef: MatDialogRef<SinglePropertyComponent>) {
    this.form = fb.group({
      'property': fb.array([]),
      defaultGroupName: [, { validators: [Validators.required], updateOn: "change" }],
      defaultPropertyName: [, { validators: [Validators.required], updateOn: "change" }],
    });
  }

  ngOnInit(): void {
    if (this.formDummyData) {
      this.formDummyData.forEach(user => {
        this.addProperty(user,true);
      
      });
    } else {
      this.addProperty(null,true);
     
   }
    this.getCompanyGroupList(35);
    this.getProductList();
  }


  addProduct(propertyIndex: number, data?: any) {
    console.log('userIndex', propertyIndex, '-------', 'data', data);
    let fg = this.fb.group({
      'productCtrl': ['', Validators.compose([Validators.required])],
      'access': ['', Validators.compose([Validators.required])],
    });
    (<FormArray>(<FormGroup>(<FormArray>this.form.controls['property'])
      .controls[propertyIndex]).controls['products']).push(fg);

  }

  deleteProduct(propertyIndex: number, index: number) {
    console.log('userIndex', propertyIndex, '-------', 'index', index);
    (<FormArray>(<FormGroup>(<FormArray>this.form.controls['property'])
      .controls[propertyIndex]).controls['products']).removeAt(index);
  }

  addProperty(property?: any,isOpen?: any) {
    let fg = this.fb.group({
      'group': ['', Validators.compose([Validators.required])],
      'property': ['', Validators.compose([Validators.required])],
      'products': this.fb.array([]),
    });
    (<FormArray>this.form.get('property')).push(fg);
    this.DataArray.push({
          
      propertyList:[],
      PanelOpenState:isOpen,

    })
    let propertyIndex = (<FormArray>this.form.get('property')).length - 1;
    if (!property) {
      this.addProduct(propertyIndex);
    }
    else {
      property.product.forEach(product => {
        this.addProduct(propertyIndex, product);
      });
    }
  }

  deleteProperty(index: number) {
    (<FormArray>this.form.get('property')).removeAt(index);
    this.DataArray.splice(index,1);
  }

  onCancle() {
    this.form.reset();
    console.log(this.form, this.form.value);
  }

  onSubmit(formValue) {
 
    if (this.form.valid) {
      var products = [];
      for (let control of this.form.get('property')['controls']) {
        for(let prdControl of control.get('products')['controls']){
          var productData = {
            "UserID": this.userID,
            "GroupID": control.controls["group"].value,
            "PropertyID": control.controls["property"].value,
            "ProductID": prdControl.controls["productCtrl"].value,
            "AccessID": prdControl.controls["access"].value,
            "CreatedBy": "Sirojan",
            "IsDeleted": false,
            "ModifiedBy": "Sirojan"
  
          }
          products.push(productData);
        }
      }
      var reqData={"UserProducts": products,"DefaultGroupID":this.form.controls["defaultGroupName"].value,
                  "DefaultPropertyID":this.form.controls["defaultPropertyName"].value,UserID:this.userID};
                  console.log(reqData);
    
      this.webService.commonMethod('userproduct/post', reqData, 'POST', null)
        .subscribe(data => {
          if (data.succeeded) {

            this.dialogRef.close({ event: 'close', data: null });
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

  ngOnDestroy(): void {
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
  getPropertyList(groupID:any,index:any) {
  
    this.webService.commonMethod('property/getbygroup/' + groupID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
        this.DataArray[index].propertyList = data.data;
        }
        else {
          //this.propertyData = [];
          this.toast.error(data.errors);
        }
  
  
      });
  }
  getProductList() {
  
    this.webService.commonMethod('product/get/', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
        this.productList = data.data;
        }
        else {
          this.productList = [];
          this.toast.error(data.errors);
        }
  
  
      });
  }
  getPropertyListParent(groupID) {

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
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }
  

}
