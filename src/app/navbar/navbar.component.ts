import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userData: any;

  constructor(
    private auth:Auth,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe((data) => {
      if (data) {
        this.userData = data;
      }
    });
  }

  SignOut() {
    this.authService.signOut();
    this.userData = null;
  }
}
