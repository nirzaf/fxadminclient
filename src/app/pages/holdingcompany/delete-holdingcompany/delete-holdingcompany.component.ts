import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
@Component({
  selector: 'app-delete-holdingcompany',
  templateUrl: './delete-holdingcompany.component.html',
  styleUrls: ['./delete-holdingcompany.component.scss']
})
export class DeleteHoldingcompanyComponent implements OnInit {
  holdingCompanyData:CompanyData;
  constructor(public dialogRef: MatDialogRef<DeleteHoldingcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: CompanyData,private webService:WebService,private toast:ToastService) { 

      this.holdingCompanyData = _holdingCompanyData;
    }
    onConfirmClick():void{
      var postData={
        "HoldingCompanyID":this.holdingCompanyData.holdingCompanyID,
             
        "DeletedBy":"Sirojan",
        // "CreatedDateTime":"2012-04-23",
        // "ModifiedDateTime":"2012-04-23"
        };
        // this.webService.commonMethod('holdingcompany/Delete/'+this.holdingCompanyData.holdingCompanyID,postData,'DELETE',null)
        // .subscribe(data=>{
        //   if(data.succeeded){
        //     //this.holdingCompanyObj=data.data;
           
        //   }
        //   else{
        //     this.toast.error(data.errors);
        //   }
          
          
        //    console.log(data);
        //   //this.isProgressing = false;
        // });
      this.webService.commonMethod('holdingcompany/delete/'+this.holdingCompanyData.holdingCompanyID,postData,'DELETE',null)
      .subscribe(data=>{
        if(data.succeeded){
          if(data.data==1){
          
            this.dialogRef.close( { event: 'close', data: 1 });
            this.toast.success("Holding Company Succesfully Removed");
  
          }
          else if(data.data==0){
            this.toast.error("Please Remove the groups First");
            this.dialogRef.close( { event: 'close', data: 0 });
          }
          //this.holdingCompanyObj=data.data;
         
        }
        else{
          this.toast.error(data.errors);
        }
        
        
         console.log(data);
        //this.isProgressing = false;
      });
    }
  ngOnInit(): void {
  }

}
