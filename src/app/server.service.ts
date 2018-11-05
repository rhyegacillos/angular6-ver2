import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: Http) { }
  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://angular-project-3ff3f.firebaseio.com/data.json', servers, {headers: headers});
    return this.http.put('https://angular-project-3ff3f.firebaseio.com/data.json', servers, {headers: headers});
  }

  getServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('https://angular-project-3ff3f.firebaseio.com/data.json', {headers: headers})
      .pipe(map(
        (response: Response) => {
          return response.json();;
        }
      ))
      .pipe(catchError(
        (error: Response) => {
          console.log(error);
          return throwError('Something went wrong');
        }
      ));
  }

  getAppName() {
    return this.http.get('https://angular-project-3ff3f.firebaseio.com/appName.json')
      .pipe(map(
        (response: Response) => {
          return response.json();
        }
      ));
  }
}
