import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HouseComponent } from '../house/house.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  private house = this.houseComponent.house;

  private message: String;

  constructor(private dataService: DataService, private houseComponent: HouseComponent) {

  }

  ngOnInit() {

  }

  sendMessage() {
    this.dataService.postResource(this.houseComponent.BASE_URL + 'message/', {message: this.message});

    // location.reload();
    this.message = '';

    this.dataService.getResource(this.houseComponent.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
    this.dataService.getResource(this.houseComponent.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
    this.dataService.getResource(this.houseComponent.BASE_URL + 'house/')
      .subscribe(
        data => this.house = data,
        error => console.log('No house')
      );
  }
}
