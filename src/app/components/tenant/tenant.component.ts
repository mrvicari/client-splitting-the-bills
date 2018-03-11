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
    this.refreshData();
  }

  toggleNewTenant() {
    this.newTenant = !this.newTenant;
  }

  refreshData(){
    setInterval(() => { this.getHouse(); }, 5000);
  }

  getHouse() {
    this.dataService.getResource(this.houseComponent.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
  }
}
