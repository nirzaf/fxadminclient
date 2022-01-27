import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
@Component({
  selector: 'app-delete-holdingcompany',
  templateUrl: './delete-holdingcompany.component.html',
  styleUrls: ['./delete-holdingcompany.component.scss']
})
export class DeleteHoldingcompanyComponent implements OnInit {
  holdingCompanyData: CompanyData;
  constructor(public dialogRef: MatDialogRef<DeleteHoldingcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: CompanyData, private webService: WebService, private toast: ToastService) {
    this.holdingCompanyData = _holdingCompanyData;
  }
  onConfirmClick(): void {
    let postData = {
      "HoldingCompanyID": this.holdingCompanyData.holdingCompanyID,
      "DeletedBy": "Sirojan",
    };

    this.webService.commonMethod('holdingcompany/delete/' + this.holdingCompanyData.holdingCompanyID, postData, 'DELETE', null)
      .subscribe(data => {
        if (data.succeeded) {
          if (data.data == 1) {
            this.dialogRef.close({ event: 'close', data: 1 });
            this.toast.success("Holding Company Succesfully Removed");
          }
          else if (data.data == 0) {
            this.toast.error("Please Remove the Child first");
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
