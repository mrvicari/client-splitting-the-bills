import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-tenant',
  providers: [DataService],
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})

export class TenantComponent implements OnInit {

  private house = this.houseComponent.house;
  private keyphrase = this.house.nameKeyphrase.split(':')[1];


  private newTenant: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    // this.houseComponent.getHouse();
    // this.house.nameKeyphrase.split(':')[1]);
    this.refreshData();
  }

  toggleNewTenant() {
    this.newTenant = !this.newTenant;
  }

  refreshData(){
    setInterval(() => { this.house = this.houseComponent.house; }, 5000);
  }
}
