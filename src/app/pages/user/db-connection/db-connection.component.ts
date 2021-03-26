import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from 'src/app/shared/constant/translate';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
export interface PeriodicElement {
  name: string;
  productName:string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,productName:"Fx Front Office Desk", name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, productName:"Fx Front Office Desk",name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, productName:"Fx Front Office Desk",name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, productName:"Fx Front Office Desk",name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5,productName:"Fx Front Office Desk", name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6,productName:"Fx Front Office Desk", name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7,productName:"Fx Front Office Desk", name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, productName:"Fx Front Office Desk",name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, productName:"Fx Front Office Desk",name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, productName:"Fx Front Office Desk", name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.scss']
})
export class DbConnectionComponent implements OnInit {
  hide = true;
  TRANSLATE: any = TRANSLATE['en'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  holdingCompanyList = [];
  groupList=[];
  propertyList=[];
  productData = [];

  public breadCrumb: string[] = [];
  dbConfigForm: FormGroup = this.formBuilder.group({
  'products': this.formBuilder.array([]),
    holdingCompany: [, { validators: [Validators.required], updateOn: "change" }],
    group: [, { validators: [Validators.required], updateOn: "change" }],
    property: [, { validators: [Validators.required], updateOn: "change" }]
    
  });
  
  constructor(private formBuilder: FormBuilder,private webService: WebService, private toast: ToastService){



  }
  addProduct(product?: any,isOpen?: any) {
    let fg = this.formBuilder.group({
      'live': ['', Validators.compose([Validators.required])],
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
      'dbName': ['', Validators.compose([Validators.required])],
      'productName': [product? product.name:'', Validators.compose([Validators.required])],
     
    });
    (<FormArray>this.dbConfigForm.get('products')).push(fg);
   
   
  }

  ngOnInit() {
    this.getProductList();
    this.breadCrumb = ["Admin", "DB Connection Access"];
    this.getHoldingCompanyList();

  }
  getProductList() {
  
    this.webService.commonMethod('product/get?pageSize=1000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
        this.productData = data.data;
        if (this.productData) {
          this.productData.forEach(product => {
            this.addProduct(product);
          
          });
        } else {
          //this.addProperty(null,true);
         
       }
        }
        else {
          this.productData = [];
          this.toast.error(data.errors);
        }
  
  
      });
  }
  onDelete(traineeId: string)
  {
    
  }

  ngOnDestroy() {

  }
  getPropertyList(groupID) {

    this.webService.commonMethod('property/getbygroup/' + groupID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.propertyList = data.data;
        }
        else {
          this.propertyList = [];
          this.toast.error(data.errors);
        }


      });
  }
  getHoldingCompanyList() {
    this.webService.commonMethod('holdingcompany/get?pageSize=1000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {         
         
         this.holdingCompanyList=data.data;
        }
        else {
          this.toast.error(data.errors);
        }



      });
  }
  getCompanyGroupList(holdingCompanyID) {
    this.webService.commonMethod('group/getbycompany/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.groupList = data.data;

       



        } else {
          this.toast.error(data.errors);
        }

      });
  }
  onSubmit(formValue) {}
}
