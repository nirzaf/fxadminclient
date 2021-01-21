import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TRANSLATE } from 'src/app/shared/constant/translate';
import { AddHoldingcompanyComponent } from 'src/app/pages/holdingcompany/add/add-holdingcompany.component';
import { AddGroupComponent } from 'src/app/pages/group/add-group/add-group.component';
import { HierarchyComponent } from 'src/app/pages/hierarchy/hierarchy.component';
import { AddSubGroupComponent } from 'src/app/pages/group/add-sub-group/add-sub-group.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ViewHoldingcompanyComponent } from 'src/app/pages/holdingcompany/view-holdingcompany/view-holdingcompany.component';
import { ViewGroupComponent } from 'src/app/pages/group/view-group/view-group.component';
import { ViewSubGroupComponent } from 'src/app/pages/group/view-sub-group/view-sub-group.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export interface HoldingCompanyOption {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  companyAutoCompleteControl = new FormControl();
  holdingCompanyOptions: HoldingCompanyOption[] = [{
    holdingCompanyID:'1', holdingCompanyName:"Sarovar Hotels 1"}
  ];
  filteredOptions: Observable<HoldingCompanyOption[]>;
  
  panelOpenState = false;
  holdingCompanyID: string;
  holdingCompanyName: string;
  public hasProperty: boolean = false;
  public isProgressing: boolean = true;
  public isAddHodlingCompany: boolean = false;
  public loaderMessage: string = "Loading...";
  TRANSLATE: any = TRANSLATE['en'];
  SelectedHoldingCompany:any;
  companyGroupList:any;
  public breadCrumb: string[] = [];

  public defaultGroupCode: string = "40531";
  public pmsCustCode: number = 20007;
  public GroupList: any = [];
  public PropertyList: any= [];
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

 
  addHoldingCompnay(): void {
    const dialogRef = this.dialog.open(AddHoldingcompanyComponent, {
      panelClass: 'custom-dialog-container',
      //minHeight: '800px',    
      data: {holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data.holdingCompanyID>0){
        this.toast.success("Successfully Added");
        this.holdingCompanyName= result.data.holdingCompanyName;
        this.holdingCompanyID=result.data.holdingCompanyID;
        this.getHoldingCompanyList();
      }
     
    });
  }
  viewCompany(): void {
    if(this.holdingCompanyID!="" && this.holdingCompanyID!=null){
      const dialogRef = this.dialog.open(ViewHoldingcompanyComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true ,
        //minHeight: '800px',    
        data: {holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data=="D"){
           this.getCompanyGroupList(this.holdingCompanyID);
           this.holdingCompanyID='';
           this.holdingCompanyName='';
           this.getHoldingCompanyList();
           //this.SelectedHoldingCompany={};
        }
        console.log('The dialog was closed');
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
    }else{
      this.toast.error("please select holding company");
     
    }
   
  }
  addGroup(): void {
    if(this.holdingCompanyID!="" && this.holdingCompanyID!=null){
      const dialogRef = this.dialog.open(AddGroupComponent, {
        panelClass: 'custom-dialog-container',
        
        //minHeight: '800px',    
        data: {holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data){
          this.getCompanyGroupList(this.holdingCompanyID);
        }
        console.log('The dialog was closed');
        this.holdingCompanyName= result.data.holdingCompanyName;
        this.holdingCompanyID=result.data.holdingCompanyID;
      });
    }else{
      this.toast.error("please select holding company");
     
    }
   
  }
  viewGroup(group): void {
    if(this.holdingCompanyID!="" && this.holdingCompanyID!=null){
      const dialogRef = this.dialog.open(ViewGroupComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true ,
        //minHeight: '800px',    
        data: {groupName: group.name, groupID:group.groupID}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getCompanyGroupList(this.holdingCompanyID);
        if(result.data=="D"){
          
           //this.holdingCompanyID='';
           //this.holdingCompanyName='';
           this.getHoldingCompanyList();
           //this.SelectedHoldingCompany={};
        }
    
      
        console.log('The dialog was closed');
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
    }else{
      this.toast.error("please select holding company");
     
    }
   
  }
  viewSubGroup(group:any,parentGroup:any,subGroupIndex:string): void {
alert(subGroupIndex);
    if(this.holdingCompanyID!="" && this.holdingCompanyID!=null){
      const dialogRef = this.dialog.open(ViewSubGroupComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true ,
        //minHeight: '800px',    
        data: {groupName: group.name, groupID:group.groupID,parentGroupName:parentGroup.name,parentGroupID:parentGroup.groupID,
        holdingCompanyName:this.holdingCompanyName,holdingCompanyID:this.holdingCompanyID,subGroupIndex:subGroupIndex
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getCompanyGroupList(this.holdingCompanyID);
        if(result.data=="D"){
          
           //this.holdingCompanyID='';
           //this.holdingCompanyName='';
           this.getHoldingCompanyList();
           //this.SelectedHoldingCompany={};
        }
    
      
        console.log('The dialog was closed');
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
    }else{
      this.toast.error("please select holding company");
     
    }
   
  }
  showHirarchy(): void {
    const dialogRef = this.dialog.open(HierarchyComponent, {
      panelClass: 'custom-dialog-container',
      //minHeight: '800px',    
      data: {holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.holdingCompanyName= result;
    });
  }
  addSubGroup(group): void {

    const dialogRef = this.dialog.open(AddSubGroupComponent, {
      panelClass: 'custom-dialog-container',
      //minHeight: '800px',    
      data: {groupName: group.name, groupID: group.groupID,holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        this.getCompanyGroupList(this.holdingCompanyID);
      }
      console.log('The dialog was closed');
      this.holdingCompanyName= result.data.holdingCompanyName;
      this.holdingCompanyID=result.data.holdingCompanyID;
    });
  }

  
  addProperty(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      panelClass: 'custom-dialog-container',
      //minHeight: '800px',    
      data: {holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.holdingCompanyName= result;
      
    });
  }
 

  constructor(private webService:WebService,private toast:ToastService,public dialog: MatDialog) { }

  ngOnInit() {
    
    this.breadCrumb = ["Admin", "Hotel Creation"];
    this.GetPropertyAndGroup();
    this.getHoldingCompanyList();
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
getCompanyGroupList(holdingCompanyID){
  this.webService.commonMethod('group/getbycompany/'+holdingCompanyID,null,'GET',null)
  .subscribe(data=>{
    if(data.succeeded){
      var originalData=data.data;
      
      var parentGroup=data.data.filter(x=>x.parentGroupID==null);
      console.log("Parent Group");
      console.log(originalData);

      this.companyGroupList=parentGroup.map(function(a) {
              var childGroups=originalData.filter(x=>x.parentGroupID==a.groupID);
              if(childGroups!=null && childGroups.length>0){
                return {name:a.name,groupID:a.groupID,panelOpenState:false,hasChildGroup:true,childGroupList:childGroups};
              }else{
                return {name:a.name,groupID:a.groupID,panelOpenState:false,hasChildGroup:false,childGroupList:null};
              }
        
      
      });
      
console.log(this.companyGroupList);
     
    }else{
      this.toast.error(data.errors);
    }

  });
}
  getHoldingCompanyList(){
    this.webService.commonMethod('holdingcompany/get?pageSize=1000',null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        var holdingCompanyID=this.holdingCompanyID;
        var holdingCompanyName='';
        console.log(data);
        this.holdingCompanyOptions =data.data.map(function(a) {
          if(holdingCompanyID==a.holdingCompanyID){
         
            holdingCompanyName=a.name;
          }
          return {holdingCompanyID:a.holdingCompanyID,holdingCompanyName:a.name}
        }
        );
       this.holdingCompanyName=holdingCompanyName;
        this.filteredOptions = this.companyAutoCompleteControl.valueChanges
        .pipe(
          startWith<string | HoldingCompanyOption>(''),
          map(value => typeof value === 'string' ? value : value.holdingCompanyName),
          map(holdingCompanyName => holdingCompanyName ? this._filter(holdingCompanyName) : this.holdingCompanyOptions.slice())
        );
        
        this.companyAutoCompleteControl.setValue({holdingCompanyID:this.holdingCompanyID , holdingCompanyName:this.holdingCompanyName});
      
       console.log(this.holdingCompanyOptions);
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  displayFn(holdingCompanyOption?: HoldingCompanyOption): string | undefined {
    return holdingCompanyOption ? holdingCompanyOption.holdingCompanyName : undefined;
  }

  private _filter(name: string): HoldingCompanyOption[] {
    const filterValue = name.toLowerCase();

    return this.holdingCompanyOptions.filter(option => option.holdingCompanyName.toLowerCase().indexOf(filterValue) === 0);
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];


  /** Whether the number of selected elements matches the total number of rows. */
  
  
  OnCompanySelected(selectedCompany){
    this.holdingCompanyID=selectedCompany.holdingCompanyID;
    this.holdingCompanyName=selectedCompany.holdingCompanyName;
    this.getCompanyGroupList(selectedCompany.holdingCompanyID);
  }

  hasChildGroup(group,groupLIst):boolean{

    const result = groupLIst.find( ({ parentGroupID }) => parentGroupID === group.groupID );
    if(result){
      return true;
    }
    else{
      return false;
    }
  }

}



