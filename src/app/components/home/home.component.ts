import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public showProfileBool: boolean;
  public showHouseBool: boolean;

  constructor(private tokenService: TokenService, private router: Router) {
    this.showHouseBool = true;
    this.showProfileBool = false;
  }

  ngOnInit() {
    this.tokenService.checkCredentials();
  }

  showHouse() {
    this.showHouseBool = true;
    this.showProfileBool = false;
  }

  showProfile() {
    this.showProfileBool = true;
    this.showHouseBool = false;
  }

  logout() {
    this.tokenService.logout();
  }
}
