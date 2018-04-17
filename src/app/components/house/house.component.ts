import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {

  public house: House;
  private houseNameCreate: string;
  private keyphraseCreate: string = '';
  private houseNameJoin: string;
  private keyphraseJoin: string = '';
  private codeJoin: string = '';

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getHouse();
    this.refreshData();
  }

  getHouse() {
    this.dataService.getResource(this.dataService.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
  }

  refreshData() {
    setInterval(() => { this.getHouse(); }, 5000);
  }

  createHouse() {
    this.dataService.postResource(this.dataService.BASE_URL + 'house/', {name: this.houseNameCreate, keyphrase: this.keyphraseCreate, nameKeyphrase: this.houseNameCreate + ':' + this.keyphraseCreate}).subscribe(
      data => location.reload(),
      error => alert(error.json().message)
    );
  }

  joinHouseKeyphrase() {
    this.dataService.putResource(this.dataService.BASE_URL + 'house/' + this.houseNameJoin + '%3A' + this.keyphraseJoin + '/join', {}).subscribe(
      data => location.reload(),
      error => alert(error.json().message)
    );
  }

  joinHouseCode() {
    this.dataService.putResource(this.dataService.BASE_URL + 'house/' + this.codeJoin + '/join', {}).subscribe(
      data => location.reload(),
      error => alert(error.json().message)
    );
  }
}

export class House {
  constructor(
    public id: number,
    public name: string,
    public keyphrase: string,
    public nameKeyphrase: string,
    public code: string,
    public tenants: Tenant[],
    public bills: Bill[],
    public payments: Payment[],
    public messages: Message[]
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

export class Bill {
  constructor(
    public id: number,
    public name: string,
    public amount: number,
    public date: string,
    public nextDate: string,
    public period: string,
    public tenant: Tenant
  ) {}
}

export class Payment {
  constructor(
    public id: number,
    public name: string,
    public amount: number,
    public date: string,
    public paymentType: string,
    public payer: Tenant,
    public tenants: Tenant[]
  ) {}
}

export class Message {
  constructor(
    public id: number,
    public date: string,
    public message: string,
    public tenant: Tenant,
  ) {}
}
