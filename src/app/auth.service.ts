import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup
        , GoogleAuthProvider, GithubAuthProvider, sendEmailVerification,  getAuth
        , sendPasswordResetEmail  } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
      .catch((err)=>err);
  }

  signIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then((res)=>res)
    .catch((err)=>err);
  }

  signOut(){
    signOut(this.auth)
    .then((res)=>res)
    .catch((err)=>err);
  }

  googleAuth(){
    signInWithPopup(this.auth,new GoogleAuthProvider() )
    .then((result) => {
      if(!result.user.isAnonymous){
        this.router.navigate(["/"])
      }
    }).catch((err)=>err);

  }

  githubAuth(){
    signInWithPopup(this.auth,new GithubAuthProvider() )
    .then((result) => {
      if(!result.user.isAnonymous){
        this.router.navigate(["/"])
      }
    }).catch((err)=>err);

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
