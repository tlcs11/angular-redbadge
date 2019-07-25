import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../models/LoginUser';
import { Token } from '../models/Token';
import { Subject } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';

const Api_Url = "http://localhost:5000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new Subject<User>();
  isLoggedIn = new Subject<boolean>();

  constructor(private _http: HttpClient, private _router: Router) { }

  register(regUserData: RegisterUser) {
    return this._http.post(`${Api_Url}/user/all`, regUserData);
  }

  login(loginUserData: LoginUser) {
    return this._http.post(`${Api_Url}/auth/login`, loginUserData).subscribe
    ( (token: Token) => {
      localStorage.setItem('auth_token', token.Authorization);
      this._router.navigate(['/']);
      this.isLoggedIn.next(true);
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
    return this._http.post(`${Api_Url}/auth/logout`, { headers: this.setHeaders() })
  }

  getMe() {
    return this._http.get(`${Api_Url}/users/me`, { headers: this.setHeaders() }).subscribe( (user: User) => { this.userInfo.next(user); });
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', localStorage.getItem('auth_token'));
  }
}
