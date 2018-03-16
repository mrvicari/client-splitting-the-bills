import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit {

  public house = this.houseComponent.house;
  public editBill: Bill;

  private name: string;
  private amount: number;
  private date: string;
  private period: string;

  public newBill: boolean;
  public editBillBool: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.refreshData();
  }

  toggleNewBill() {
    this.newBill = !this.newBill;
  }

  toggleEditBill(billId) {
    for (var bill of this.house.bills) {
      if (bill.id == billId) {
        this.editBill = bill;
      }
    }

    this.editBillBool = true;
  }

  createBill(billForm) {
    this.dataService.postResource(this.dataService.BASE_URL + 'bill/',
    {name: this.name, amount: this.amount, nextDate: this.date, period: this.period});

    billForm.reset();
    this.newBill = false;
  }

  editBillFunc(editBillForm) {
    for (var t of this.house.tenants) {
      if (this.editBill.tenant.email == t.email) {
        this.editBill.tenant = t;
      }
    }

    this.dataService.putResource(this.dataService.BASE_URL + 'bill/' + String(this.editBill.id),
    {name: this.editBill.name, amount: this.editBill.amount, nextDate: this.editBill.nextDate,
     period: this.editBill.period, tenant: this.editBill.tenant});

     editBillForm.reset();
     this.editBillBool = false;
  }

  deleteBill(billId) {
    this.dataService.deleteResource(this.dataService.BASE_URL + 'bill/' + String(billId));

    this.editBillBool = false;
  }

  refreshData() {
    setInterval(() => { this.house = this.houseComponent.house; }, 5000);
  }
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

export class Tenant {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public balance: number
  ) {}
}
