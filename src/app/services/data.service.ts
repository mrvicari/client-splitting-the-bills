import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  // public BASE_URL: string = 'http://splittingthebills.us-east-2.elasticbeanstalk.com/';
  public BASE_URL: string = 'http://10.41.2.127:8080/';

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

  deleteResource(resourceURL) {
    let headers = new Headers({'Authorization': 'Bearer ' + Cookie.get('access_token'), 'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    this.http.delete(resourceURL, options).subscribe();
  }

  postRegister(data) {
    return this.http.post(this.BASE_URL + 'tenant/register', data);
  }
}
