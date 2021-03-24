import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EditHoldingcompanyComponent } from '../edit-holdingcompany/edit-holdingcompany.component';
import { DeleteHoldingcompanyComponent } from '../delete-holdingcompany/delete-holdingcompany.component';

export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
@Component({
  selector: 'app-view-holdingcompany',
  templateUrl: './view-holdingcompany.component.html',
  styleUrls: ['./view-holdingcompany.component.scss']
})

export class ViewHoldingcompanyComponent implements OnInit {
  holdingCompanyData:CompanyData;
  holdingCompanyObj={code:'',name:'',cityName:'',address:'',stateName:'',countryName:'',zipCode:'',   
                    phoneNumber:''};

  constructor(    public dialogRef: MatDialogRef<ViewHoldingcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: CompanyData,private webService:WebService,private toast:ToastService,public dialog: MatDialog
    ) {
      this.holdingCompanyData = _holdingCompanyData;
      this.getHoldingCompanyData(_holdingCompanyData.holdingCompanyID);

     }

  ngOnInit(): void {
  }
  editCompany(): void {

      const dialogRef = this.dialog.open(EditHoldingcompanyComponent, {
        panelClass: ['viewmore-dialog-container'],
        disableClose: true ,
        
        //minHeight: '800px',    
        data: {holdingCompanyName: this.holdingCompanyData.holdingCompanyName, holdingCompanyID: this.holdingCompanyData.holdingCompanyID}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data==1){
        
          this.getHoldingCompanyData(this.holdingCompanyData.holdingCompanyID);
          this.toast.success("Updated Successfully");
          // this.getCompanyGroupList(this.holdingCompanyID);
        }
      
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
   
   
  }
  getHoldingCompanyData(holdingCompanyID){
    this.webService.commonMethod('holdingcompany/get/'+holdingCompanyID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.holdingCompanyObj=data.data;
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
     
      //this.isProgressing = false;
    });
  }
  delete():void{
    const dialogRef = this.dialog.open(DeleteHoldingcompanyComponent, {
      //panelClass: ['viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {holdingCompanyName: this.holdingCompanyData.holdingCompanyName, holdingCompanyID: this.holdingCompanyData.holdingCompanyID}
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
   
    this.dialogRef.close( { event: 'close', data: this.holdingCompanyData });
  }
}
