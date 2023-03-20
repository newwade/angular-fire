import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) { }

  signUp(email:string, password:string){
       createUserWithEmailAndPassword(this.auth,email,password)
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err));
  }

  signIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
  }

  signOut(){
    signOut(this.auth)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
  }

}
