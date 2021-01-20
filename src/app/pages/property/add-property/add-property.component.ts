import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatIconRegistry } from '@angular/material/icon/icon-registry';
import { StarRatingColor } from '../../../shared/star-rating/star-rating.component';
import { OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';
export interface DialogData {
  animal: string;
  name: string;
}
export interface NetworkIP {
  name: string;
}
export interface MacID {
  name: string;
}
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent implements OnInit {

  form: FormGroup;
  
  items = [];
  rating: number = 4;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.primary;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  networkIPs: NetworkIP[] = [
    { name: '192.168.3.1' },
    { name: '192.168.3.2' },
    { name: '192.168.3.3' },
  ];
  macIDs: MacID[] = [
    { name: '00-14-22-01-23-45' },
    { name: '00-14-22-01-23-46' },
    { name: '00-14-22-01-23-47' },
  ];

  addProperty() {
    const val = this.fb.group({
      OrderName: new FormControl(),
      OrderId: '2',
      CountryId: '1',
      StateId: '2',
      CityId: '3',
      HotelTypeId: '1',
      WeekDayId: '1',
      WeekEndDayId: '1',
      CurrencyId: '1',
      OtherCurrencyId: '1',
      networkIPs: this.fb.array([{ name: '192.168.3.1' }, { name: '192.168.3.2' }, { name: '192.168.3.3' }]),
      macIDs: this.fb.array([{ name: '00-14-22-01-23-45' }, { name: '00-14-22-01-23-46' }, { name: '00-14-22-01-23-47' },]),
      rating: 2
    });

    const form = this.form.get('times') as FormArray
    form.push(val);
    console

  }
  getItems() {
    return [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' }
    ];
  }
  removeProperty(index) {
    const form = this.form.get('times') as FormArray
    form.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }


  addNetworkIP(event: MatChipInputEvent,i): void {
    const input = event.input;
    const value = event.value;
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    // Add our fruit
    if ((value || '').trim()) {
      item.value.networkIPs.push({ name: value.trim() });
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeNetworkIP(networkIP: NetworkIP,i): void {
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    const index = item.value.networkIPs.indexOf(networkIP);

    if (index >= 0) {
      item.value.networkIPs.splice(index, 1);
    }
  }
  addMacID(event: MatChipInputEvent,i): void {
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      item.value.macIDs.push({ name: value.trim() });
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMacID(macID: MacID, i): void {
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    const index = item.value.macIDs.indexOf(macID);
    if (index >= 0) {
      item.value.macIDs.splice(index, 1);
    }
  }
  defaultGroupCode: any = "aaa";
  public GroupList: any = [];


  constructor(
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder,private webService:WebService) {
    
    for (var i = 0; i < 5; i++) {
      this.GroupList.push({
        "GroupName": "test",
        "GroupCode": "aaa",
        "GroupID": i
      })
      this.form = this.fb.group({
        times: this.fb.array([

        ])
      });
      this.items = this.getItems();
    }
    this.addProperty();

    console.log(this.form.get('times'))


  }
  ngOnInit() {
  }
  onRatingChanged(rating, i) {
    var arrayControl = this.form.get('times') as FormArray;
    var item = arrayControl.at(i);
    item.value.rating = rating
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
