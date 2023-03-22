import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
  userData : User | null;
  constructor(public authService : AuthService, private auth : Auth, private  router:Router){
    this.userData = auth.currentUser;
  }

  ngOnInit(){
    if(!this.userData){
        this.router.navigate(["/login"])
    }
  }
}
