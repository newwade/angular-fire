import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationform: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth : Auth
  ) {
    this.registrationform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  handleRegistration(form: FormGroup) {
    const value = form.value;
    this.authService.signUp('' + value.email, '' + value.password);
    authState(this.auth).subscribe((data)=>{
      if(!data?.isAnonymous){
        this.router.navigate(["/verification"])
      }
    })
    
  }
  ngOnInit() {}

}
