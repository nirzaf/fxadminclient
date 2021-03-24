import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { DeletePropertyComponent } from '../delete-property/delete-property.component';
import { EditPropertyComponent } from '../edit-property/edit-property.component';

import { MatIconRegistry } from '@angular/material/icon/icon-registry';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import  *  as  dayList  from  'src/app/shared/data/day.json';
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
  dayListArr= (dayList  as  any).default;
  propertyObj={code:'',name:'',cityName:'',address:'',stateName:'',countryName:'',zipCode:'',   
                    phoneNumber:'',website:'',currencyCode:'',hotelTypeName:'',checkInTime:'',checkOutTime:'',otherCurrenciesArr:[],hotelType:'',weekDays:'',weekEnds:'',
                    macAddressesArr:[],starRating:0,networkIPsArr:[]};

  constructor(    public dialogRef: MatDialogRef<ViewPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public _propertyData: PropertyData, private fb: FormBuilder,private webService:WebService,private toast:ToastService,public dialog: MatDialog
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
    
        // this.holdingCompanyName= result.data.holdingCompanyName;
        // this.holdingCompanyID=result.data.holdingCompanyID;
      });
   
   
  }
  getDayNameById(id:string):any{

    return this.dayListArr.filter(x => x.dayID == id);
  }
  getPropertyData(propertyID){
    this.webService.commonMethod('property/get/'+propertyID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
      
     
        if(data.data.weekEnds){
         
          var weekEndArr = data.data.weekEnds.split(',');
         
          var WeekEndVal='';
          var i=0;
          var WeekDayArr=[...this.dayListArr];
          for(let weekEnd of  weekEndArr)
          {
            if(i!=0){
              WeekEndVal=WeekEndVal+','+this.getDayNameById(weekEnd)[0].name;
            }else{
              WeekEndVal=this.getDayNameById(weekEnd)[0].name;
            }
            var index = WeekDayArr.map(x => {
              return x.dayID;
            }).indexOf(weekEnd);
            
            WeekDayArr.splice(index, 1);
            i++;
           
          }
          var WeekDayVal='';
          var j=0;
          for(let weekDay of WeekDayArr){
            if(j!=0){
              WeekDayVal=WeekDayVal+','+weekDay.name;
            }else{
              WeekDayVal=weekDay.name;
            }
            j++;

          }
          
   
          data.data.weekEnds=WeekEndVal;
          data.data.weekDays=WeekDayVal;

        }
      
        this.propertyObj=data.data;
        if(data.data.networkIP){
          this.propertyObj.networkIPsArr=data.data.networkIP.split(',');
        }
        if(data.data.macAddresses){
          this.propertyObj.macAddressesArr=data.data.macAddresses.split(',');
        }
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
      
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
      
      }
     
     
    });
   
  }
  close(): void {
   
    this.dialogRef.close( { event: 'close', data: this.propertyData });
  }
}
