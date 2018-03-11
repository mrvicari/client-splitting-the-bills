import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';


@Component({
  selector: 'app-profile',
  providers: [HouseComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private house: House;
  private currentTenant: Tenant;

  private password: String;
  private confirmPassword: String;

  private editTenantBool: boolean;
  private editHouseBool: boolean;

  constructor(private tokenService: TokenService,
              private dataService: DataService,
              private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.tokenService.checkCredentials();

    this.dataService.getResource(this.houseComponent.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );

    this.dataService.getResource(this.houseComponent.BASE_URL + 'tenant/')
      .subscribe(
        data => this.currentTenant = data,
        error => console.log('No tenant')
      );
  }

  toggleEditTenant() {
    this.editTenantBool = !this.editTenantBool;
  }

  toggleEditHouse() {
    this.editHouseBool = !this.editHouseBool;
  }

  editTenant() {
    this.dataService.putResource(this.houseComponent.BASE_URL + 'tenant/', {
      id: this.currentTenant.id, name: this.currentTenant.name, email: this.currentTenant.email, password: this.password
    });

    this.tokenService.logout();
  }

  editHouse() {
    this.dataService.putResource(this.houseComponent.BASE_URL + 'house/', {
      name: this.house.name, keyphrase: this.house.keyphrase, nameKeyphrase: this.house.name + ':' + this.house.keyphrase
    });

    location.reload();
  }

  leaveHouse() {
    this.dataService.putResource(this.houseComponent.BASE_URL + 'house/leave', {});

    location.reload();
  }
}

export class House {
  constructor(
    public id: number,
    public name: string,
    public keyphrase: string
  ) {}
}

export class Tenant {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public balance: number
  ) {}
}
