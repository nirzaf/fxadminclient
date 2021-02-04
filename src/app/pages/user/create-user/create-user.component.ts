import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {

}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {

    this.dialogRef.close({ event: 'close', data: null });
  }

}
