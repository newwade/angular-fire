import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: FormGroup;
  constructor(
    private authService: AuthService,
    private auth : Auth,
    private router: Router
  ) {
    this.loginform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  handleLogin(form: FormGroup) {
    const value = form.value;
    this.authService.signIn('' + value.email, '' + value.password);
    authState(this.auth).subscribe((data)=>{
      if(!data?.isAnonymous){
        this.router.navigate(["/"]);
      }
    })
    }
}
