import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {

  // public BASE_URL: string = 'http://10.41.7.143:8080/';
  public BASE_URL: string = 'http://192.168.0.22:8080/';

  public house: House;
  private houseNameCreate: string;
  private keyphraseCreate: string = '';
  private houseNameJoin: string;
  private keyphraseJoin: string = '';

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getHouse();
  }

  getHouse() {
    this.dataService.getResource(this.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
  }

  createHouse() {
    this.dataService.postResource(this.BASE_URL + 'house/', {name: this.houseNameCreate, keyphrase: this.keyphraseCreate, nameKeyphrase: this.houseNameCreate + ':' + this.keyphraseCreate});

    location.reload();
  }

  joinHouse() {
    this.dataService.putResource(this.BASE_URL + 'house/' + this.houseNameJoin + '%3A' + this.keyphraseJoin + '/join', {});

    location.reload();
  }
}

export class House {
  constructor(
    public id: number,
    public name: string,
    public keyphrase: string,
    public nameKeyphrase: string,
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
