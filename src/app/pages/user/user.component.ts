import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public isProgressing: boolean = true;
  public loaderMessage: string = "Loading...";


  public breadCrumb: string[] = [];

  public defaultGroupCode: string = "40531";
  public pmsCustCode: number = 20007;
  public GroupList: any = [];
  public PropertyList: any= [];



  

  constructor(private webService:WebService,private toast:ToastService) { }

  ngOnInit() {
    this.breadCrumb = ["Admin", "User Configuration"];
    this.GetPropertyAndGroup();

    this.getAPIlist();
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


  getAPIlist(){
    this.webService.commonMethod('PropertyAndGroup/list-by-login',{"LoginID":"nitish.kumar@idsnext.com"},'POST','fxauth')
    .subscribe(data=>{
      // this.toast.error("Api hitted success")
      // console.log(data);
      this.isProgressing = false;
    });
  }

  


  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  email:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
  {position: 3984, name: 'John Lee',email: 'john@gmail.com', weight: 4.0026, symbol: 'He'},
];
