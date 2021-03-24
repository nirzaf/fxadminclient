import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
export interface GroupData {
  groupID: string;
  groupName: string;
}
@Component({
  selector: 'app-delete-sub-group',
  templateUrl: './delete-sub-group.component.html',
  styleUrls: ['./delete-sub-group.component.scss']
})
export class DeleteSubGroupComponent implements OnInit {

  groupData:GroupData;
  constructor(public dialogRef: MatDialogRef<DeleteSubGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public _groupData: GroupData,private webService:WebService,private toast:ToastService) { 

      this.groupData = _groupData;
    }
    onConfirmClick():void{
      var postData={
        "GroupID":this.groupData.groupID,
             
        "DeletedBy":"Sirojan",
        // "CreatedDateTime":"2012-04-23",
        // "ModifiedDateTime":"2012-04-23"
        };
     
      this.webService.commonMethod('group/delete/'+this.groupData.groupID,postData,'DELETE',null)
      .subscribe(data=>{
        if(data.succeeded){
          if(data.data==1){
          
            this.dialogRef.close( { event: 'close', data: 1 });
            this.toast.success("Group Succesfully Removed");
  
          }
          else if(data.data==0){
            this.toast.error("Please Remove the Child elements");
            this.dialogRef.close( { event: 'close', data: 0 });
          }
          //this.holdingCompanyObj=data.data;
         
        }
        else{
          this.toast.error(data.errors);
        }
        
        
       
        //this.isProgressing = false;
      });
    }
  ngOnInit(): void {
  }

}
