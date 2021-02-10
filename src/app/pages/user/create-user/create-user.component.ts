import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
export interface DialogData {

}
export interface NetworkIP {
  name: string;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  linkProperty=false;
  networkIPs=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  macIDs=[];
  holdingCompanyData: DialogData;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }
  addNetworkIP(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
   
  
    // Add our fruit
    if ((value || '').trim()) {
      this.networkIPs.push({ name: value.trim() });
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeNetworkIP(networkIP: NetworkIP): void {
    
    
    const index = this.networkIPs.indexOf(networkIP);

    if (index >= 0) {
      this.networkIPs.splice(index, 1);
    }
  }
  addMacID(event: MatChipInputEvent): void {
    
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.macIDs.push({ name: value.trim() });
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMacID(macID: MacID): void {

    const index = this.macIDs.indexOf(macID);
    if (index >= 0) {
      this.macIDs.splice(index, 1);
    }
  }
  submitForm(){
this.linkProperty=true;
  }

}
