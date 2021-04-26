import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import  *  as  titleList  from  'src/app/shared/data/title.json';
import  *  as  genderList  from  'src/app/shared/data/gender.json';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
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
    const dialogRef = this.dialog.open(EditUserComponent, {
      panelClass: ['create-user-modal','viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {userName: this.userData.userName, userID: this.userData.userID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data==1){
      
        this.getUserData(this.userData.userID);
        this.toast.success("Updated Successfully");
        // this.getCompanyGroupList(this.holdingCompanyID);
      }
    
      // this.holdingCompanyName= result.data.holdingCompanyName;
      // this.holdingCompanyID=result.data.holdingCompanyID;
    });
  }

  delete():any{
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      //panelClass: ['viewmore-dialog-container'],
      disableClose: true ,
      
      //minHeight: '800px',    
      data: {userName: this.userData.userName, userID: this.userData.userID}
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
  
  close():any{

    this.dialogRef.close({ event: 'close', data: null });
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
       
      }
      else{
        this.toast.error(data.errors);
      }   
      
    });
  }

}
