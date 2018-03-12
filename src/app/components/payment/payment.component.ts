import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  public house = this.houseComponent.house;
  private currentTenant: Tenant;

  private name: string;
  private amount: number;
  private paymentType: string;
  private tenantEmails: string[];
  private tenantEmail: string;
  private tenantObjects: Tenant[] = [];

  public newPayment: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.dataService.getResource(this.dataService.BASE_URL + 'tenant/')
      .subscribe(
        data => this.currentTenant = data,
        error => console.log('No tenant')
      );
  }

  toggleNewPayment() {
    this.newPayment = !this.newPayment;
  }

  createPayment(paymentForm) {
    if (this.paymentType == 'SPLIT') {
      for (var email of this.tenantEmails) {
        for (var t of this.house.tenants) {
          if (email == t.email) {
            this.tenantObjects.push(t);
          }
        }
      }
    }
    else {
      for (var t of this.house.tenants) {
        if (this.tenantEmail == t.email) {
          this.tenantObjects.push(t);
        }
      }
    }

    this.dataService.postResource(this.dataService.BASE_URL + 'payment/',
    {name: this.name, amount: this.amount, paymentType: this.paymentType, tenants: this.tenantObjects});

    paymentForm.reset();
    this.newPayment = false;

    this.getHouse();
    this.getHouse();
    this.getHouse();
  }

  getHouse() {
    this.dataService.getResource(this.dataService.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
  }
}

export class Tenant {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public balance: number
  ) {}
}
