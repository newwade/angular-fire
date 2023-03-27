import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OnInit } from '@angular/core';
import { Auth, authState, getAuth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  userData : any;
  constructor(private auth : Auth, private router : Router) {
    this.userData = this.auth.currentUser;
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userData === null) {
      this.router.navigate(["login"])
      return false;
    }
    if(this.userData.currentUser?.emailVerified){
      this.router.navigate(["/"])
      return false;
    }
    return true;
  }
 
}
