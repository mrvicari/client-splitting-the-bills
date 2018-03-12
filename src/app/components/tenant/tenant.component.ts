import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})

export class TenantComponent implements OnInit {

  public house = this.houseComponent.house;

  public newTenant: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.refreshData();
  }

  toggleNewTenant() {
    this.newTenant = !this.newTenant;
  }

  refreshData() {
    setInterval(() => { this.house = this.houseComponent.house; }, 5000);
  }
}
