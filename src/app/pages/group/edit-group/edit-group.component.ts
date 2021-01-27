import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
export interface GroupData {
  groupID: string;
  groupName: string;
}
@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  editGroupForm: FormGroup = this.formBuilder.group({
    groupName: [, { validators: [Validators.required], updateOn: "change" }],
    groupCode: [, { validators: [Validators.required], updateOn: "change" }],
    groupAddress: [, { validators: [Validators.required], updateOn: "change" }],
    groupCountry: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    groupState: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    groupCity: [0, { validators: [Validators.min(1)], updateOn: "change" }],
    groupPinZip: [, { validators: [Validators.required], updateOn: "change" }],
    groupPhone: [, { validators: [Validators.required], updateOn: "change" }],
  
});
groupData:GroupData;
country:any=0;
  city:any=0;
  state:any=0;
public cityList: any = [];
public stateList: any = [];
public countryList: any = [];
  constructor( public dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public _groupData: GroupData,private webService:WebService,private toast:ToastService,private formBuilder: FormBuilder) 
    {
      this.groupData = _groupData;
      this.getgroupData(_groupData.groupID);

      this.getCountryList();
     }

  ngOnInit(): void {
  }
  close(): void {
   
    this.dialogRef.close( { event: 'close', data: null });
  }
  getCityList(stateID:string){
    this.webService.commonMethod('city/get/'+stateID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.cityList=data.data;
      
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }

  getCountryList(){
    this.webService.commonMethod('country/get?pageSize=100',null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.countryList=data.data;
       
        
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  getStateList(countryID:string){
    this.cityList=[];
    this.webService.commonMethod('state/get/'+countryID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
        this.stateList=data.data;
       
          
        
      }
      else{
        this.toast.error(data.errors);
        this.stateList=[];
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  getgroupData(groupID){
    this.webService.commonMethod('group/get/'+groupID,null,'GET',null)
    .subscribe(data=>{
      if(data.succeeded){
      
        this.editGroupForm.get('groupCode').setValue(data.data.code);
        this.editGroupForm.get('groupName').setValue(data.data.name);
        this.editGroupForm.get('groupAddress').setValue(data.data.address);
        this.editGroupForm.get('groupCountry').setValue(data.data.countryId);
      
        this.editGroupForm.get('groupState').setValue(data.data.stateId);
    
        this.editGroupForm.get('groupCity').setValue(data.data.cityId);
        this.getStateList(data.data.countryId);
        this.getCityList(data.data.stateId);
        this.editGroupForm.get('groupPinZip').setValue(data.data.zipCode);
        this.editGroupForm.get('groupPhone').setValue(data.data.phoneNumber);
        //this.groupObj=data.data;
       
      }
      else{
        this.toast.error(data.errors);
      }
      
      
       console.log(data);
      //this.isProgressing = false;
    });
  }
  submitForm():void{
    if (this.editGroupForm.valid) {
      var postData={
        "groupID":this.groupData.groupID,
        "Name":this.editGroupForm.controls['groupName'].value,
        "Code":this.editGroupForm.controls['groupCode'].value,
        "CityId":this.editGroupForm.controls['groupCity'].value,
        "StateId":this.editGroupForm.controls['groupState'].value,
        "CountryId":this.editGroupForm.controls['groupCountry'].value,
        "ZipCode":this.editGroupForm.controls['groupPinZip'].value,
        "PhoneNumber":this.editGroupForm.controls['groupPhone'].value,
        "Address":this.editGroupForm.controls['groupAddress'].value,            
        "ModifiedBy":"Sirojan",
        // "CreatedDateTime":"2012-04-23",
        // "ModifiedDateTime":"2012-04-23"
        }
        this.webService.commonMethod('group/put/'+this.groupData.groupID,postData,'PUT',null)
        .subscribe(data=>{
          if(data.succeeded){
            if(data.data==0){
              this.toast.error("Code Must be unique");
            }
            else if(data.data=1){
              this.dialogRef.close( { event: 'close', data: 1 });
            }
            //this.countryList=data.data;
            //this.groupData.groupID=data.data.groupID;
            //this.groupData.groupName=data.data.name;
           
          }
          else{
          
            this.toast.error(data.errors);
          }
          
          
           console.log(data);
          //this.isProgressing = false;
        });
    } else {
     return;
    }
  
  }

}
