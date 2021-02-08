import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TRANSLATE } from 'src/app/shared/constant/translate';
import { AddHoldingcompanyComponent } from 'src/app/pages/holdingcompany/add/add-holdingcompany.component';
import { AddGroupComponent } from 'src/app/pages/group/add-group/add-group.component';
import { HierarchyComponent } from 'src/app/pages/hierarchy/hierarchy.component';
import { AddSubGroupComponent } from 'src/app/pages/group/add-sub-group/add-sub-group.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ViewHoldingcompanyComponent } from 'src/app/pages/holdingcompany/view-holdingcompany/view-holdingcompany.component';
import { ViewGroupComponent } from 'src/app/pages/group/view-group/view-group.component';
import { ViewSubGroupComponent } from 'src/app/pages/group/view-sub-group/view-sub-group.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ViewPropertyComponent } from './view-property/view-property.component';

export interface HoldingCompanyOption {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
export interface GroupData {
  groupID: string;
  groupName: string;
}
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  searchText;
  searchEnable=false;
  radioParentGroup: any;
  radioChildGroup: any;
  companyAutoCompleteControl = new FormControl();
  holdingCompanyOptions: HoldingCompanyOption[] = [{
    holdingCompanyID: '1', holdingCompanyName: "Sarovar Hotels 1"
  }
  ];
  groupData: GroupData[];
  propertyData: any[];
  filteredOptions: Observable<HoldingCompanyOption[]>;

  panelOpenState = false;
  groupID: string;
  groupName: string;
  holdingCompanyID: string;
  holdingCompanyName: string;
  public hasProperty: boolean = false;
  public isProgressing: boolean = true;
  public isAddHodlingCompany: boolean = false;
  public loaderMessage: string = "Loading...";
  TRANSLATE: any = TRANSLATE['en'];
  SelectedHoldingCompany: any;
  companyGroupList: any;
  public breadCrumb: string[] = [];

  public defaultGroupCode: string = "40531";
  public pmsCustCode: number = 20007;
  public GroupList: any = [];
  public PropertyList: any = [];
  parentGroupChange(evt: any, group: any) {
    var target = evt.target;
    this.groupID = evt.value;
    this.groupName = group.name;

    console.log("Radio Change");
    this.propertyData = [];
    this.getPropertyList(this.groupID);
    this.searchText='';
    

  }
  showSearch(){
    this.searchEnable=!this.searchEnable;
  }
  childGroupChange(evt: any, group: any, parentGroup: any) {
    var target = evt.target;
    this.groupID = evt.value;


    console.log("Radio Change");
    this.propertyData = [];
    this.getPropertyList(this.groupID);
    this.searchText='';
    this.groupName = group.name;

  }
  addHoldingCompnay(): void {
    const dialogRef = this.dialog.open(AddHoldingcompanyComponent, {
      panelClass: 'custom-dialog-container',

      data: { holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID },

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data.holdingCompanyID > 0) {
        this.toast.success("Successfully Added");
        this.holdingCompanyName = result.data.holdingCompanyName;
        this.holdingCompanyID = result.data.holdingCompanyID;
        this.getHoldingCompanyList();
        this.getCompanyGroupList(this.holdingCompanyID);
        this.getPropertyListByCompany(this.holdingCompanyID);

      }

    });
  }
  viewCompany(): void {
    if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
      const dialogRef = this.dialog.open(ViewHoldingcompanyComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true,

        data: { holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.data == "D") {
          this.getCompanyGroupList(this.holdingCompanyID);
          this.holdingCompanyID = '';
          this.holdingCompanyName = '';
          this.getHoldingCompanyList();

        }

      });
    } else {
      this.toast.error("please select holding company");

    }

  }
  addGroup(): void {
    if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
      const dialogRef = this.dialog.open(AddGroupComponent, {
        panelClass: 'custom-dialog-container',


        data: { holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.data) {
          this.getCompanyGroupList(this.holdingCompanyID);
        }

        this.holdingCompanyName = result.data.holdingCompanyName;
        this.holdingCompanyID = result.data.holdingCompanyID;
      });
    } else {
      this.toast.error("please select holding company");

    }

  }
  viewGroup(group): void {
    if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
      if(this.radioParentGroup==group.groupID){
        const dialogRef = this.dialog.open(ViewGroupComponent, {
          panelClass: 'viewmore-dialog-container',
          disableClose: true,
          //minHeight: '800px',    
          data: { groupName: group.name, groupID: group.groupID }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.getCompanyGroupList(this.holdingCompanyID);
          if (result.data == "D") {
            this.getHoldingCompanyList();
          }
          console.log('The dialog was closed');
  
        });
      }else{
        this.toast.error("please select the Group to view details");
      }
      
    } else {
      this.toast.error("please select holding company");

    }

  }
  viewSubGroup(group: any, parentGroup: any, subGroupIndex: string): void {

    if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
      if(this.radioParentGroup==group.groupID){
      const dialogRef = this.dialog.open(ViewSubGroupComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true,

        data: {
          groupName: group.name, groupID: group.groupID, parentGroupName: parentGroup.name, parentGroupID: parentGroup.groupID,
          holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID, subGroupIndex: subGroupIndex
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getCompanyGroupList(this.holdingCompanyID);
        if (result.data == "D") {
          this.getHoldingCompanyList();
        }
      });
    }else{
      this.toast.error("please select the Sub Group to view details");
    }
    } else {
      this.toast.error("please select holding company");

    }

  }
  showHirarchy(): void {
    if (this.holdingCompanyID != "" && this.holdingCompanyID != null) {
    const dialogRef = this.dialog.open(HierarchyComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID }
    });

    dialogRef.afterClosed().subscribe(result => {

      //this.holdingCompanyName = result;
    });
  } else {
    this.toast.error("please select holding company");

  }
  }
  addSubGroup(group): void {
    if(this.radioParentGroup==group.groupID){
    const dialogRef = this.dialog.open(AddSubGroupComponent, {
      panelClass: 'custom-dialog-container',

      data: { groupName: group.name, groupID: group.groupID, holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.getCompanyGroupList(this.holdingCompanyID);
      }

      this.holdingCompanyName = result.data.holdingCompanyName;
      this.holdingCompanyID = result.data.holdingCompanyID;
    });
  }else{
    this.toast.error("please select the  Group First");
  }
  }


  addProperty(): void {
    if (this.groupID != "" && this.groupID != null) {
      const dialogRef = this.dialog.open(AddPropertyComponent, {
        panelClass: 'custom-dialog-container',
        //minHeight: '800px',    
        data: {
          holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID, groupID: this.groupID,
          groupName: this.groupName
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getPropertyList(this.groupID);

      });
    }
    else {
      this.toast.error("please select a group");
    }
  }


  constructor(private webService: WebService, private toast: ToastService, public dialog: MatDialog) { }

  ngOnInit() {

    this.breadCrumb = ["Admin", "Hotel Creation"];
    this.getHoldingCompanyList();
    this.isProgressing=false;

  }

  getCompanyGroupList(holdingCompanyID) {
    this.webService.commonMethod('group/getbycompany/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          var originalData = data.data;

          var parentGroup = data.data.filter(x => x.parentGroupID == null);


          this.companyGroupList = parentGroup.map(function (a) {
            var childGroups = originalData.filter(x => x.parentGroupID == a.groupID);
            if (childGroups != null && childGroups.length > 0) {
              return { name: a.name, groupID: a.groupID, panelOpenState: false, hasChildGroup: true, childGroupList: childGroups };
            } else {
              return { name: a.name, groupID: a.groupID, panelOpenState: false, hasChildGroup: false, childGroupList: null };
            }


          });



        } else {
          this.toast.error(data.errors);
        }

      });
  }
  getPropertyListByCompany(holdingCompanyID) {
    this.webService.commonMethod('property/GetByHoldingCompany/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.propertyData = data.data;
        } else {
          this.toast.error(data.errors);
        }

      });
  }
  getHoldingCompanyList() {
    this.webService.commonMethod('holdingcompany/get?pageSize=1000', null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          var holdingCompanyID = this.holdingCompanyID;
          var holdingCompanyName = '';

          this.holdingCompanyOptions = data.data.map(function (a) {
            if (holdingCompanyID == a.holdingCompanyID) {

              holdingCompanyName = a.name;
            }
            return { holdingCompanyID: a.holdingCompanyID, holdingCompanyName: a.name }
          }
          );
          this.holdingCompanyName = holdingCompanyName;
          this.filteredOptions = this.companyAutoCompleteControl.valueChanges
            .pipe(
              startWith<string | HoldingCompanyOption>(''),
              map(value => typeof value === 'string' ? value : value.holdingCompanyName),
              map(holdingCompanyName => holdingCompanyName ? this._filter(holdingCompanyName) : this.holdingCompanyOptions.slice())
            );

          this.companyAutoCompleteControl.setValue({ holdingCompanyID: this.holdingCompanyID, holdingCompanyName: this.holdingCompanyName });


        }
        else {
          this.toast.error(data.errors);
        }



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


  OnCompanySelected(selectedCompany) {
    this.holdingCompanyID = selectedCompany.holdingCompanyID;
    this.holdingCompanyName = selectedCompany.holdingCompanyName;
    this.getCompanyGroupList(selectedCompany.holdingCompanyID);
    this.getPropertyListByCompany(selectedCompany.holdingCompanyID);
    this.searchEnable=false;
    this.searchText="";
    this.groupID = "";
    this.groupName = "";
    this.propertyData = [];
  }

  hasChildGroup(group, groupLIst): boolean {

    const result = groupLIst.find(({ parentGroupID }) => parentGroupID === group.groupID);
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }
  getPropertyList(groupID) {

    this.webService.commonMethod('property/getbygroup/' + groupID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          this.propertyData = data.data;
        }
        else {
          this.propertyData = [];
          this.toast.error(data.errors);
        }


      });
  }
  viewProperty(property: any, propertyIndex: string): void {

    if (this.groupID != "" && this.groupID != null) {
      const dialogRef = this.dialog.open(ViewPropertyComponent, {
        panelClass: 'viewmore-dialog-container',
        disableClose: true,
        //minHeight: '800px',    
        data: {
          groupName: this.groupName, groupID: this.groupID,
          holdingCompanyName: this.holdingCompanyName, holdingCompanyID: this.holdingCompanyID, propertyIndex: propertyIndex,
          propertyName: property.name, propertyID: property.propertyID
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getCompanyGroupList(this.holdingCompanyID);
        this.getPropertyList(this.groupID);
        if (result.data == "D") {


          this.getHoldingCompanyList();

        }




      });
    } else {
      this.toast.error("please select the Holding company & Group");

    }

  }

}



