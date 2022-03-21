import {Component, OnInit} from '@angular/core';
import {Stock} from "../stock";
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {StocksListEditDialogComponent} from "./stocks-list-edit-dialog/stocks-list-edit-dialog.component";
import {StocksListAddDialogComponent} from "./stocks-list-add-dialog/stocks-list-add-dialog.component";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css'],
  providers: [ DataService ]
})
export class StocksListComponent implements OnInit {
  stocks: Stock[] = []

  constructor(private dataService: DataService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getStocks()
      .subscribe(data => this.stocks = data as Stock[]);
  }

  updateStock(updatedStock: Stock): void {
    this.dataService.updateStock(updatedStock);
  }

  deleteStocks(selectedOptions: IterableIterator<MatListOption>): void {
    let selectedStocks: Stock[] = [];
    for (let option of selectedOptions) {
      selectedStocks.push(option.value);
    }
    for (let delStock of selectedStocks) {
      this.stocks = this.stocks.filter(stock => {
        return stock.symbol != delStock.symbol;
      });
    }
    this.dataService.deleteStocks(selectedStocks);
  }

  addStock(newStock: Stock): void {

    this.stocks.push(newStock);
    this.dataService.addStock(newStock);
  }

  openEditDialog(stock: Stock): void {
    let stockCopy = JSON.parse(JSON.stringify(stock));
    const editDialogRef = this.dialog.open(StocksListEditDialogComponent, {
      data: { stock : stock },
      disableClose: true
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateStock(result as Stock);
      } else {
        Object.assign(stock, stockCopy);
      }
    });
  }

  openAddDialog(): void {
    const addDialogRef = this.dialog.open(StocksListAddDialogComponent, {
      disableClose: true
    });

    addDialogRef.afterClosed().subscribe((result) => {
      // If user pressed 'Cancel', don't do anything
      if (result) {
        let stock = result as Stock;
        if (Object.values(stock).every((prop) => prop)) {
          if (this.stocks.some(obj => obj.symbol == stock.symbol)) {
            alert("Company with such symbol already exists")
          } else {
            this.addStock(stock);
          }
        } else {
          alert("Not all field are initialized");
        }
      }
    });
  }
}

