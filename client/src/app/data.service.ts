import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from "./user";
import { Settings } from "./settings";
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl = "http://localhost:8000/users";
  private settingsUrl = "http://localhost:8000/settings";
  private stocksUrl = "http://localhost:8000/stocks";

  constructor(private http: HttpClient) {}

  getUsers() {
    // We can replace this logic to the constructor,
    // but in this case we can get up-to-date data
    return this.http.get(this.usersUrl);
  }

  updateUser(user: User) {
    this.http.put(this.usersUrl, { user: user })
      .subscribe((data: any) => {
        console.log("Users: PUT request finished successfully");
      });
  }

  deleteUsers(users: User[]) {
    for (let user of users) {
      this.http.delete(`${this.usersUrl}/${user.username}`)
        .subscribe((data: any) => {
          console.log("Users: DELETE request finished successfully")
        });
    }
  }

  addUser(user: User) {
    this.http.post(this.usersUrl, { user: user })
      .subscribe((data: any) => {
        console.log("Users: POST request finished successfully")
      });
  }

  getSettings() {
    return this.http.get(this.settingsUrl);
  }

  updateSettings(settings: Settings) {
    this.http.put(this.settingsUrl, { settings: settings })
      .subscribe((data: any) => {
        console.log("Settings: PUT request finished successfully");
      });
  }

  getStocks() {
    // We can replace this logic to the constructor,
    // but in this case we can get up-to-date data
    return this.http.get(this.stocksUrl);
  }

  updateStock(stock: Stock) {
    this.http.put(this.stocksUrl, { stock: stock })
      .subscribe((data: any) => {
        console.log("Stocks: PUT request finished successfully");
      });
  }

  deleteStocks(stocks: Stock[]) {
    for (let stock of stocks) {
      this.http.delete(`${this.stocksUrl}/${stock.symbol}`)
        .subscribe((data: any) => {
          console.log("Stocks: DELETE request finished successfully")
        });
    }
  }

  addStock(stock: Stock) {
    this.http.post(this.stocksUrl, { stock: stock })
      .subscribe((data: any) => {
        console.log("Stocks: POST request finished successfully")
      });
  }
}

