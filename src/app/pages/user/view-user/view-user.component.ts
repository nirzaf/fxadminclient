import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import  *  as  titleList  from  'src/app/shared/data/title.json';
import  *  as  genderList  from  'src/app/shared/data/gender.json';
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
  genderListArr= (genderList  as  any).default;
  userData:UserData;
  userObj={holdingCompanyName:'',alias:'',titleID:'',lastName:'',titleName:'',middleName:'',firstName:'',genderName:'',   
  genderID:'',designationID:'',designationName:'',departmentName:'',validFromDateView:'',validToDateView:'',imageVirtualPath:'',userTypeName:'',loginID:'',passwordExpiryDays:''
  ,isAuthorized:'',macAddressesArr:[],networkIPsArr:[],officeAddress:'',officeCountryName:'',officeStateName:'',officeCityName:'',officeZipCode:'',
  officeMobileCountryCode:'',officeMobile:'',officePhoneCountryCode:'',officePhone:'',officeExtension:'',officeEmail:'',
  personalAddress:'',personalCountryName:'',personalStateName:'',personalCityName:'',personalZipCode:'',personalMobileCountryCode:'',personalMobileNo:'',
  personalPhoneCountryCode:'',personalPhoneNumber:'',personalEmail:'',birthDate:'',remarks:'',birthDateView:''
};
  
  constructor(public dialogRef: MatDialogRef<ViewUserComponent>,private webService:WebService,@Inject(MAT_DIALOG_DATA) public _userData: UserData,private toast:ToastService
  ,public dialog: MatDialog) {
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
  getGenderNameById(id:string):any{

    return this.genderListArr.filter(x => x.genderID == id);
  }
  getUserData(userID){
    //console.log(this.dayListArr);
    this.webService.commonMethod('user/GetById/'+userID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
      this.userObj=data.data;
        this.userObj.titleName=this.getTitleNameById(data.data.titleID)[0].name;
        this.userObj.genderName=this.getGenderNameById(data.data.genderID)[0].name;
        if(data.data.ipAddress){
          this.userObj.networkIPsArr=data.data.ipAddress.split(',');
        }
        if(data.data.macAddress){
          this.userObj.macAddressesArr=data.data.macAddress.split(',');
        }
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
