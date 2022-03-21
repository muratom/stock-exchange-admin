import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import {Routes, RouterModule} from "@angular/router";
import { FormsModule } from "@angular/forms";

// Components
import { AppComponent } from './app.component';
import { BrokersListComponent, BrokersListEditDialogComponent, BrokersListAddDialogComponent } from './brokers-list/brokers-list.component';
import { HomeComponent } from './home/home.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StocksListEditDialogComponent } from "./stocks-list/stocks-list-edit-dialog/stocks-list-edit-dialog.component";
import { StocksListAddDialogComponent } from "./stocks-list/stocks-list-add-dialog/stocks-list-add-dialog.component";
import { SettingsComponent } from './settings/settings.component';

// Services
import { DataService } from "./data.service";

// Angular Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "brokers", component: BrokersListComponent },
  { path: "settings", component: SettingsComponent },
  { path: "stocks", component: StocksListComponent},
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BrokersListComponent,
    BrokersListEditDialogComponent,
    BrokersListAddDialogComponent,
    HomeComponent,
    StocksListComponent,
    StocksListEditDialogComponent,
    StocksListAddDialogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Apply routes
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
