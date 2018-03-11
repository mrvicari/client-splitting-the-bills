import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) {

  }

  getResource(resourceURL): Observable<any> {
      let headers = new Headers({'Authorization': 'Bearer ' + Cookie.get('access_token')});
      let options = new RequestOptions({headers: headers});

      return this.http.get(resourceURL, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postResource(resourceURL, data) {
      let headers = new Headers({'Authorization': 'Bearer ' + Cookie.get('access_token'), 'Content-type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      this.http.post(resourceURL, data, options).subscribe();
  }

  putResource(resourceURL, data) {
      let headers = new Headers({'Authorization': 'Bearer ' + Cookie.get('access_token'), 'Content-type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      this.http.put(resourceURL, data, options).subscribe();
  }

  postRegister(data) {
    return this.http.post('http://192.168.0.22:8080/register', data);
  }
}
