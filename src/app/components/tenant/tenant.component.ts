import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})

export class TenantComponent implements OnInit {

  private house = this.houseComponent.house;


  private newTenant: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {

  }

  toggleNewTenant() {
    this.newTenant = !this.newTenant;
  }
}
