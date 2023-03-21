import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : Auth,private router:Router) { }
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


  googleAuth(){
    signInWithPopup(this.auth,new GoogleAuthProvider() )
    .then((result) => {
      if(!result.user.isAnonymous){
        this.router.navigate(["/"])
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }



}
