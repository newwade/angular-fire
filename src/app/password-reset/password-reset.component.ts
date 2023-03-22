import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {

  constructor(private authService : AuthService,private router : Router){

  }

  async handlePasswordReset(email:string){
      await this.authService.sendPasswordReset(email)
      .then((res)=>{
        console.log(res)
        alert("Please check your email and click on the link to reset your password")
      })
      .catch((err)=>{
        if(err.code === "auth/invalid-email"){
          alert("user does not exist");
        }
      })
  }

}
