import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WebService } from 'src/app/shared/services/web.service';
export interface userData {
  userID: string;
  userName: string;
}
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  userData: userData;
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public _userData: userData, private webService: WebService, private toast: ToastService) {

    this.userData = _userData;
  }
  onConfirmClick(): void {
    var postData = {
      "UserID": this.userData.userID,
      "DeletedBy": "Sirojan",

    };

    this.webService.commonMethod('user/delete/' + this.userData.userID, postData, 'DELETE', null)
      .subscribe(data => {
        if (data.succeeded) {
          if (data.data == 1) {

            this.dialogRef.close({ event: 'close', data: 1 });
            this.toast.success("User Succesfully Removed");

          }
          else if (data.data == 0) {
            this.toast.error("Please Remove the product first");
            this.dialogRef.close({ event: 'close', data: 0 });
          }


        }
        else {
          this.toast.error(data.errors);
        }



      });
  }
  ngOnInit(): void {
  }

}
