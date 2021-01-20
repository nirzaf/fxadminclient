import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';
export interface GroupData {
  groupID: string;
  groupName: string;
}
@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  groupData:GroupData;
  groupObj={code:'',name:'',cityName:'',address:'',stateName:'',countryName:'',zipCode:'',   
                    phoneNumber:''};

  constructor(    public dialogRef: MatDialogRef<ViewGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public _groupData: GroupData,private webService:WebService,private toast:ToastService,public dialog: MatDialog
    ) {
      this.groupData = _groupData;
      this.getGroupData(_groupData.groupID);

     }

  ngOnInit(): void {
  }
  editGroup(): void {

      const dialogRef = this.dialog.open(EditGroupComponent, {
        panelClass: ['viewmore-dialog-container'],
        disableClose: true ,
        
        //minHeight: '800px',    
        data: {groupName: this.groupData.groupName, groupID: this.groupData.groupID}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data==1){
        
          this.getGroupData(this.groupData.groupID);
          this.toast.success("Updated Successfully");
          // this.getCompanyGroupList(this.holdingCompanyID);
        }
        console.log('The dialog was closed');
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
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  delete():void{
    const dialogRef = this.dialog.open(DeleteGroupComponent, {
      //panelClass: ['viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {holdingCompanyName: this.groupData.groupName, holdingCompanyID: this.groupData.groupID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data==1){
        //this.dialogRef.close( { event: 'close', data: this.holdingCompanyData });
        this.dialogRef.close( { event: 'close', data:"D" });
        
        // this.getCompanyGroupList(this.holdingCompanyID);
      }
      else{
        console.log('The dialog was closed');
      }
     
     
    });
   
  }
  close(): void {
   
    this.dialogRef.close( { event: 'close', data: this.groupData });
  }

}
