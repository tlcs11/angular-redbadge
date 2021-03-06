import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public _logInForm: FormGroup;

  public _username: string;
  private _subscription;
  public _isLoggedIn: boolean;
  private _isLoggedInSubscription;
  
  constructor(private _form: FormBuilder, private _service: AuthService) {
    this._subscription = this._service.userInfo.subscribe( (value) => {
      this._username = value.username;
    });
    this._isLoggedInSubscription = this._service.isLoggedIn.subscribe( (value) => {
      this._isLoggedIn = value;
    });
    this._service.checkAuthentication();
    this.createForm();
  }

  logout() {
    this._service.logout();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._isLoggedInSubscription.unsubscribe();
  }

  createForm() {
    this._logInForm = this._form.group({
      email: new FormControl,
      password: new FormControl,
    })
  }

  onSubmit() {
    console.log('Login Submitted');
    this._service.login(this._logInForm.value);
  }
  
}
