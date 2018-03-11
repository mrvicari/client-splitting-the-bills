import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit {

  private house = this.houseComponent.house;

  private name: string;
  private amount: number;
  private date: string;
  private period: string;

  private newBill: boolean;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.houseComponent.getHouse();
  }

  toggleNewBill() {
    this.newBill = !this.newBill;
  }

  createBill() {
    this.dataService.postResource(this.houseComponent.BASE_URL + 'bill/',
    {name: this.name, amount: this.amount, date: this.date, period: this.period});

    location.reload();
  }
}