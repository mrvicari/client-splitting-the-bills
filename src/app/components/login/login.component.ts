import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginData = {username: '', password: ''};

  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {

  }

  login() {
    this.tokenService.obtainAccessToken(this.loginData);
  }
}
