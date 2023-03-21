import { Component } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  userData : User | null;
  constructor(public authService : AuthService, private auth : Auth){
    this.userData = auth.currentUser;
  }
}
