import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserHierarchyComponent } from './user-hierarchy/user-hierarchy.component';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ViewUserComponent } from './view-user/view-user.component';

export interface PeriodicElement {   
  position:number;
  userID: number;
  userProductID: number;
  holdingCompanyID: number; 
  firstName: string;
  titleID: number;
  loginID:string;
  companyName:string;
  propertyName:string;
  groupName:string;
  groupID:number;
  propertyID:number;
  productID:number;
  accessID:number;

}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;
  SelectedUserProduct:any;
  public isProgressing: boolean = true;
  public loaderMessage: string = "Loading...";


  public breadCrumb: string[] = [];

  public defaultGroupCode: string = "40531";
  public pmsCustCode: number = 20007;
  public GroupList: any = [];
  public PropertyList: any= [];
  public userProductList:any=[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodicElement>;

  selection = new SelectionModel<PeriodicElement>(true, []);
  

  constructor(private webService:WebService,private toast:ToastService,public dialog: MatDialog,private http: HttpClient) { }

  ngOnInit() {
    this.breadCrumb = ["Admin", "User Configuration"];
    this.GetPropertyAndGroup();

    this.getAPIlist();
    //this.getUserProductListByUser(11);
    this.searchMoviesCtrl.valueChanges
      .pipe(
       
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(`https://localhost:44358/api/v1/user/searchuser/${value ? value: 'NAN'}`  )
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
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data["data"];
        }

        console.log(this.filteredMovies);
      });
  }
  displayFn(userProduct?: any): string | undefined {
    console.log("displayFn");
    console.log(userProduct);
    return userProduct ? userProduct.firstName+'-'+userProduct.companyName : undefined;
  }
  OnUserProductSelect(SelectedUserProduct) {
    this.getUserProductListByUser(SelectedUserProduct.userID);
    console.log("Onchange");
    console.log(SelectedUserProduct);
  }
  showHirarchy(): void {
    // if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
    const dialogRef = this.dialog.open(UserHierarchyComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { holdingCompanyName:'dddfdfd', holdingCompanyID: 35 }
    });

    dialogRef.afterClosed().subscribe(result => {

      //this.holdingCompanyName = result;
    });
  // } else {
  //   this.toast.error("please select holding company");

  // }
  }
  GetPropertyAndGroup() {
    let serverResponse = {"Response":"Success","Code":"FCS00001","Description":"Property And Group List","Data":[{"propertyGroupID":40531,"propertyGroupCode":40531,"propertyGroupName":"FXFD QA Group","propertyList":[{"propertyID":40529,"pmsCustCode":20007,"propertyName":"FXFD QA1 Property","hotelConnStr":"Server=;Database=;User ID=;Password=;Trusted_Connection=False","pmsVendor":"FX1","crsApplicable":false,"isGSTApplicable":false,"isInterfaceApplicable":false}]}]};
    for (let a of serverResponse.Data) {
      this.GroupList.push({
        "GroupName": a.propertyGroupName,
        "GroupCode": "" + a.propertyGroupCode,
        "GroupID": a.propertyGroupID
      })
      for (let b of a.propertyList) {
     
          this.PropertyList.push({
            "propertyID": b.propertyID,
            "pmsCustCode": b.pmsCustCode,
            "propertyName": b.propertyName,
            "isGSTApplicable": b.isGSTApplicable,
            "isInterfaceApplicable": b.isInterfaceApplicable,
            "pmsVendor": b.pmsVendor
          })
        }
      }    
    
  }

  CreateUser(): void {
  
      const dialogRef = this.dialog.open(CreateUserComponent, {
        panelClass:['custom-dialog-container','create-user-modal'] ,
        //minHeight: '800px',    
        data: {
 
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        //this.getPropertyList(this.groupID);

      });
   
  }
  getAPIlist(){
    this.webService.commonMethod('PropertyAndGroup/list-by-login',{"LoginID":"nitish.kumar@idsnext.com"},'POST','fxauth')
    .subscribe(data=>{
      // this.toast.error("Api hitted success")
     
      this.isProgressing = false;
    });
  }
  viewUser(row){
    console.log(row);
    const dialogRef = this.dialog.open(ViewUserComponent, {
      panelClass:['create-user-modal','viewmore-dialog-container'] ,
      //minHeight: '800px',    
      data: {
userID:row.userID
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.getPropertyList(this.groupID);

    });
  }
  getUserProductListByUser(userID) {
    this.webService.commonMethod('user/get?userID='+userID+'&pageSize=1000&pageNumber=1', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.userProductList=data.data;
          var userPrdData=[];
          var i=0;
          userPrdData = data.data.map(function (a) {
            a.select=false;
            a.position=i;
            //a.select=this.selection;
            i++;
            return a;
          }
          );
          console.log(userPrdData);
          this.userProductList=userPrdData;
        
        
          this.dataSource = new MatTableDataSource <PeriodicElement> (userPrdData);
          this.displayedColumns =  ['companyName','groupName','propertyName','userID','firstName','loginID','accessID'];
          this.selection = new SelectionModel<PeriodicElement>(true, []);
          console.log(this.dataSource);
          //this.propertyData = data.data;
        } else {
          this.toast.error(data.errors);
        }

      });
  }
  



  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
//   {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},

// ];
