import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginCredentials } from '../model/login-credentials.interface';

@Component({
  selector: 'login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrl: './login-main-page.component.css'
})
export class LoginPageComponent {

  public processingRequest: boolean = false;
  public invalidCredentials: boolean = false;

  public credentials: LoginCredentials = {
    username: '',
    password: ''

  }

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) { }

  login() {
    this.processingRequest = true;

    console.log(this.credentials, this.processingRequest);

    this.handleUnauthorized();


  }


  handleUnauthorized() {
    this.invalidCredentials = true;
  }
}
