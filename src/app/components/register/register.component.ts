import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private name: String;
  private email: String;
  private password: String;
  private confirmPassword: String;

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {

  }

  register() {
    this.dataService.postRegister({name: this.name, email: this.email, password: this.password}).subscribe();

    this.router.navigate(['/login']);
  }
}
