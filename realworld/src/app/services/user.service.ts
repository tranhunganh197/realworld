import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  user: any;
  token: any;
  userData: any = new ReplaySubject(1);
  currentUser: Observable<any> = this.userData.asObservable();
  tokenData:any = new ReplaySubject(1);
  currentToken: Observable<any> = this.tokenData.asObservable();

  signup(user: any) {
    this.http
      .post('http://localhost:3000/api/users', user)
      .subscribe((data:any) => {
          this.setUser(data);
          this.userData.next(this.user?.user);
          this.tokenData.next(localStorage.getItem('token'));
      },err => {
        return;
      });
  }

  setUser(user: any) {
    this.user = user;
  }

  signin(user: any) {
    this.http
      .post('http://localhost:3000/api/users/login', user)
      .subscribe((data) => {
        this.setUser(data);
        this.userData.next(this.user?.user);
        this.tokenData.next(localStorage.getItem('token'));
      },err => {
        return;
      });
  }

  settingsUser(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put('http://localhost:3000/api/user', user, httpOptions);
  }

  getUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    if (localStorage.getItem('token')) {
      return this.http.get('http://localhost:3000/api/user', httpOptions);
    } else {
      return this.currentUser;
    }
  }

  getProfile() {
    return this.http.get(
      `http://localhost:3000/api/profiles/` + this.user?.user?.username
    );
  }
}
 