import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { AuthService } from './auth.service';
import { RegisterUser } from '../models/RegisterUser';
import { LoginUser } from '../models/LoginUser';
import { Token } from '../models/Token';
import { User } from '../models/User';

const Api_Url = "https://yourwill2.herokuapp.com/";


import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private _http: HttpClient, private_router: Router) {
   }


getProducts () {
  return this._http.get(`${Api_Url}/item/`)

}

getProduct() {
  return this._http.get(`${Api_Url}/item/{item_id}`);
  
}

addProduct (id:Product) {
  return this._http.post(`${Api_Url}/item/`, id, { headers: this.setHeaders()});
  
  
}

updateProduct (id:Product) {
  return this._http.put(`${Api_Url}/item/`, id)
  
}

deleteProduct (id:Product ) {
  const url = `${Api_Url}/${id}`;

  return this._http.delete(`${Api_Url}/item/${id}`),{ headers:this.setHeaders()};
}


private setHeaders(): HttpHeaders {
  return new HttpHeaders().set('Authorization', localStorage.getItem('auth_token'));
}
}