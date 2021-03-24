import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
export interface PropertyData {
  propertyID: string;
  propertyName: string;
}
@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.scss']
})
export class DeletePropertyComponent implements OnInit {
  propertyData:PropertyData;
  constructor(public dialogRef: MatDialogRef<DeletePropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public _propertyData: PropertyData,private webService:WebService,private toast:ToastService) { 

      this.propertyData = _propertyData;
    }
    onConfirmClick():void{
      var postData={
        "PropertyID":this.propertyData.propertyID,
             
        "DeletedBy":"Sirojan",
        // "CreatedDateTime":"2012-04-23",
        // "ModifiedDateTime":"2012-04-23"
        };
     
      this.webService.commonMethod('property/delete/'+this.propertyData.propertyID,postData,'DELETE',null)
      .subscribe(data=>{
        if(data.succeeded){
          if(data.data==1){
          
            this.dialogRef.close( { event: 'close', data: 1 });
            this.toast.success("Property Succesfully Removed");
  
          }
          else if(data.data==0){
            this.toast.error("Please Remove the Child elements first");
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
