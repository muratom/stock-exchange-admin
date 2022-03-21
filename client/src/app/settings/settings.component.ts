import { Component, OnInit } from '@angular/core';

// Classes
import { Settings } from "../settings";

// Services
import { DataService } from "../data.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings()

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSettings().subscribe(data => this.settings = data as Settings);
  }

  updateSettings(): void {
    // Validation
    if (Object.values(this.settings).every((prop) => prop) && this.settings.recalcCostDelaySec > 0) {
      this.dataService.updateSettings(this.settings);
    } else {
      alert("Not all field are initialized");
    }
  }
}
