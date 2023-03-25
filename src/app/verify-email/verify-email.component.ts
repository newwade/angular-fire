import { Component, OnInit } from '@angular/core';
import { Auth, authState, getAuth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
  userData !: User | null;
  constructor(public authService : AuthService, private auth : Auth, private  router:Router){
  }

  async sendVerificationMail(){
    await this.authService.SendVerificationMail()
    .then((res)=>{
      alert("Please check your email and click on the link to verify your email")
    })
    .catch((err)=>{
      console.log(err.code)
      alert(err.code.substring(err.code.indexOf("/")+1))
    })
  }

  ngOnInit(){
    authState(this.auth).subscribe((data) => {
      if (data) {
        this.userData = data;
      }
    });
  }
}
