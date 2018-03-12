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

  public message: String;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {
    this.refreshData();
  }

  sendMessage(messageForm) {
    this.dataService.postResource(this.dataService.BASE_URL + 'message/', {message: this.message});

    messageForm.reset();
  }
  
  refreshData(){
    setInterval(() => { this.house = this.houseComponent.house; }, 5000);
  }
}
