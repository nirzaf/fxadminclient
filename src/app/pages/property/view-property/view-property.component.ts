import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { DeletePropertyComponent } from '../delete-property/delete-property.component';
import { EditPropertyComponent } from '../edit-property/edit-property.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
export interface PropertyData {
  propertyID: string;
  propertyName: string;
  holdingCompanyID:string;
  holdingCompanyName:string;
  groupID:string;
  groupName:string;
  propertyIndex:number;
}
@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  rating: number = 4;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.primary;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  
  propertyData:PropertyData;
  propertyObj={code:'',name:'',cityName:'',address:'',stateName:'',countryName:'',zipCode:'',   
                    phoneNumber:'',website:'',currencyName:'',hotelTypeName:'',checkInTime:'',checkOutTime:'',otherCurrencies:[],hotelType:'',weekDays:[],weekend:[],
                    macAddresses:[],starRating:0,networkIPs:[]};

  constructor(    public dialogRef: MatDialogRef<ViewPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public _propertyData: PropertyData,private webService:WebService,private toast:ToastService,public dialog: MatDialog
    ) {
      this.propertyData = _propertyData;
      this.getPropertyData(_propertyData.propertyID);

     }

  ngOnInit(): void {
  }
  editProperty(): void {

      const dialogRef = this.dialog.open(EditPropertyComponent, {
        panelClass: ['viewmore-dialog-container'],
        disableClose: true ,
        
        //minHeight: '800px',    
        data: {propertyName: this.propertyData.propertyName, propertyID: this.propertyData.propertyID,
        holdingCompanyName:this.propertyData.holdingCompanyName,holdingCompanyID:this.propertyData.holdingCompanyID,
        groupID:this.propertyData.groupID, groupName:this.propertyData.groupName,propertyIndex:this.propertyData.propertyIndex
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.data==1){
        
          this.getPropertyData(this.propertyData.propertyID);
          this.toast.success("Updated Successfully");
          // this.getCompanyGroupList(this.holdingCompanyID);
        }
        console.log('The dialog was closed');
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
   
   
  }
  getPropertyData(propertyID){
    this.webService.commonMethod('property/get/'+propertyID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.propertyObj=data.data;
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  delete():void{
    const dialogRef = this.dialog.open(DeletePropertyComponent, {
      //panelClass: ['viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {propertyName: this.propertyData.propertyName, propertyID: this.propertyData.propertyID}
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
   
    this.dialogRef.close( { event: 'close', data: this.propertyData });
  }
}
