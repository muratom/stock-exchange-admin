import { Component } from '@angular/core';
import {Stock} from "../../stock";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-stocks-list-add-dialog',
  templateUrl: './stocks-list-add-dialog.component.html',
  styleUrls: ['./stocks-list-add-dialog.component.css']
})
export class StocksListAddDialogComponent {
  stock: Stock = new Stock()
  constructor(public dialogRef: MatDialogRef<StocksListAddDialogComponent>) { }

  close() {
    // Validation
    // @ts-ignore
    if (Object.values(this.stock).every((prop) => prop) && this.stock.maxStep > 0 && this.stock.amount > 0 && this.stock.price > 0) {
      this.dialogRef.close(this.stock);
    } else {
      alert("Invalid data in field")
    }
  }
}
