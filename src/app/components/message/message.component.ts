import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  public house = this.houseComponent.house;
  public messages: Message[];

  public message: String;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.refreshData();
  }

  sendMessage(messageForm) {
    this.dataService.postResource(this.dataService.BASE_URL + 'message/', {message: this.message}).subscribe(
      data => messageForm.reset(),
      error => alert(error.json().message)
    );

    this.refreshData();
  }

  refreshData(){
    setInterval(() => {
      this.house = this.houseComponent.house;
      this.messages = this.house.messages.slice().reverse();
    }, 5000);
  }
}

export class Message {
  constructor(
    public id: number,
    public date: string,
    public message: string,
    public tenant: Tenant,
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
