import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import  *  as  titleList  from  'src/app/shared/data/title.json';
export interface UserData {
  userID: number;
  userName: string;
 
}
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  titleListArr= (titleList  as  any).default;

  userData:UserData;
  userObj={holdingCompanyName:'',alias:'',titleID:'',lastName:'',titleName:'',countryName:'',zipCode:'',   
                    phoneNumber:'',website:'',currencyCode:'',hotelTypeName:'',checkInTime:'',checkOutTime:'',otherCurrenciesArr:[],hotelType:'',weekDays:'',weekEnds:'',
                    macAddressesArr:[],starRating:0,networkIPsArr:[]};
  constructor(public dialogRef: MatDialogRef<ViewUserComponent>,private webService:WebService,@Inject(MAT_DIALOG_DATA) public _userData: UserData,private toast:ToastService) {
    this.userData = _userData;



   }

  ngOnInit(): void {
    this.getUserData(this.userData.userID);
  }
  editUser():any{

  }
  delete():any{

  }
  close():any{

  }
  getTitleNameById(id:string):any{

    return this.titleListArr.filter(x => x.titleID == id);
  }
  getUserData(userID){
    //console.log(this.dayListArr);
    this.webService.commonMethod('user/GetById/'+userID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
      this.userObj=data.data;
        this.userObj.titleName=this.getTitleNameById(data.data.titleID)[0].name;
     
        // if(data.data.weekEnds){
        //   console.log(this.dayListArr);
        //   var weekEndArr = data.data.weekEnds.split(',');
          
        //   var WeekEndVal='';
          
        //   var i=0;
         
        //  //var WeekDayArr=this.dayListArr;
        //  const WeekDayArr  = Object.assign([], this.dayListArr);
        //   // console.log(WeekDayArr);
        //   for(let weekEnd of  weekEndArr)
        //   {
           
        //     if(i!=0){
        //       WeekEndVal=WeekEndVal+', '+this.getDayNameById(weekEnd)[0].name;
        //     }else{
        //       WeekEndVal=this.getDayNameById(weekEnd)[0].name;
        //     }
            

           
            
        //     i++;
           
        //   }
        
        
          
   
        //   data.data.weekEnds=WeekEndVal;
        //   //

        // }
        // if(data.data.weekDays){
        //   var WeekDayVal='';
        //   var weekDayArr = data.data.weekDays.split(',');
          
       
        //   var i=0;
         
        
        //   for(let weekDay of  weekDayArr)
        //   {
           
        //     if(i!=0){
        //       WeekDayVal=WeekDayVal+', '+this.getDayNameById(weekDay)[0].name;
        //     }else{
        //       WeekDayVal=this.getDayNameById(weekDay)[0].name;
        //     }
            

           
            
        //     i++;
           
        //   }
        
        
          
   
      
        //   data.data.weekDays=WeekDayVal;

        // }
      
        // this.propertyObj=data.data;
        // if(data.data.networkIP){
        //   this.propertyObj.networkIPsArr=data.data.networkIP.split(',');
        // }
        // if(data.data.macAddresses){
        //   this.propertyObj.macAddressesArr=data.data.macAddresses.split(',');
        // }
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
      
      //this.isProgressing = false;
    });
  }

}
