import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TokenService {

  constructor(private router: Router, private http: Http) {

  }

  obtainAccessToken(loginData) {
      let params = new URLSearchParams();
      params.append('username', loginData.username.toLowerCase());
      params.append('password', loginData.password);
      params.append('grant_type', 'password');

      let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                                 'Authorization': 'Basic ' + btoa('trusted-client:secret')});
      let options = new RequestOptions({headers: headers});

      this.http.post('http://192.168.0.22:8080/oauth/token', params.toString(), options)
        .map(res => res.json())
        .subscribe(
            data => this.saveToken(data),
            err => alert('Invalid login credentials')
        );
  }

  saveToken(token) {
      var expireDate = new Date().getTime() + (1000 * token.expires_in);

      Cookie.set('access_token', token.access_token, expireDate);

      this.router.navigate(['/']);
  }

  checkCredentials() {
      if (!Cookie.check('access_token')) {
          this.router.navigate(['/login']);
      }
  }

  logout() {
      Cookie.delete('access_token');

      this.router.navigate(['/login']);
  }
}
