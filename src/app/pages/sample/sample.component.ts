import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  
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
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];