import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Stock} from "../../stock";

@Component({
  selector: 'app-stocks-list-edit-dialog',
  templateUrl: './stocks-list-edit-dialog.component.html',
  styleUrls: ['./stocks-list-edit-dialog.component.css']
})
export class StocksListEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<StocksListEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { stock: Stock }) { }

  close() {
    // Validation
    // @ts-ignore
    if (Object.values(this.data.stock).every((prop) => prop) && this.data.stock.maxStep > 0 && this.data.stock.amount > 0 && this.data.stock.price > 0) {
      this.dialogRef.close(this.data.stock);
    } else {
      alert("Invalid data in field")
    }
  }
}
