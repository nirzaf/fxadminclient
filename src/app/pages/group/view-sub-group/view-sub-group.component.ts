import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { EditSubGroupComponent } from '../edit-sub-group/edit-sub-group.component';
import { DeleteSubGroupComponent } from '../delete-sub-group/delete-sub-group.component';
export interface GroupData {
  groupID: string;
  groupName: string;
  parentGroupName:string;
  parentGroupID:string;
  holdingCompanyName:string;
  holdingCompanyID:string;
  subGroupIndex:string
}
@Component({
  selector: 'app-view-sub-group',
  templateUrl: './view-sub-group.component.html',
  styleUrls: ['./view-sub-group.component.scss']
})
export class ViewSubGroupComponent implements OnInit {

  groupData:GroupData;
  groupObj={code:'',name:'',cityName:'',address:'',stateName:'',countryName:'',zipCode:'',   
                    phoneNumber:''};

  constructor(    public dialogRef: MatDialogRef<ViewSubGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public _groupData: GroupData,private webService:WebService,private toast:ToastService,public dialog: MatDialog
    ) {
      this.groupData = _groupData;
      this.getGroupData(_groupData.groupID);

     }

  ngOnInit(): void {
  }
  editGroup(): void {

      const dialogRef = this.dialog.open(EditSubGroupComponent, {
        panelClass: ['viewmore-dialog-container'],
        disableClose: true ,
        
        //minHeight: '800px',    
        data: {groupName: this.groupData.groupName, groupID: this.groupData.groupID,
          holdingCompanyName:this.groupData.holdingCompanyName,holdingCompanyID:this.groupData.holdingCompanyID,
          parentGroupName:this.groupData.parentGroupName,parentGroupID:this.groupData.parentGroupID,
          subGroupIndex:this.groupData.subGroupIndex
        
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data==1){
        
          this.getGroupData(this.groupData.groupID);
          this.toast.success("Updated Successfully");
          // this.getCompanyGroupList(this.holdingCompanyID);
        }
     
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
   
   
  }
  getGroupData(groupID){
    this.webService.commonMethod('group/get/'+groupID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.groupObj=data.data;
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
      
      //this.isProgressing = false;
    });
  }
  delete():void{
    const dialogRef = this.dialog.open(DeleteSubGroupComponent, {
      //panelClass: ['viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {groupName: this.groupData.groupName, groupID: this.groupData.groupID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data==1){
        //this.dialogRef.close( { event: 'close', data: this.holdingCompanyData });
        this.dialogRef.close( { event: 'close', data:"D" });
        
        // this.getCompanyGroupList(this.holdingCompanyID);
      }
      else{
       
      }
     
     
    });
   
  }
  close(): void {
   
    this.dialogRef.close( { event: 'close', data: this.groupData });
  }

}
