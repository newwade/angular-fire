import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendEmailVerification, user, getAuth, sendPasswordResetEmail  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {User, createUserWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afAuth = getAuth();
  constructor(private auth : Auth,private router:Router) {
   }

  signUp(email:string, password:string){
       createUserWithEmailAndPassword(this.auth,email,password)
      .then((res)=>{
        sendEmailVerification(res.user)
        .then((res)=>res)        
      })
      .catch((err)=>console.log(err));
  }

  signIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then((res)=>res)
    .catch((err)=>console.log(err));
  }

  signOut(){
    signOut(this.auth)
    .then((res)=>res)
    .catch((err)=>console.log(err));
  }

  googleAuth(){
    signInWithPopup(this.auth,new GoogleAuthProvider() )
    .then((result) => {
      if(!result.user.isAnonymous){
        this.router.navigate(["/"])
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  async SendVerificationMail(){
    if(this.afAuth.currentUser){
      await sendEmailVerification(this.afAuth.currentUser);
    }
  }

  async sendPasswordReset(email:string){
    await sendPasswordResetEmail(this.afAuth,email)
  }
}
