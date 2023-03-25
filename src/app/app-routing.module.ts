import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(["/"])
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register', component: RegisterComponent, canActivate:[AuthGuard], data:{ authGuardPipe: redirectLoggedInToHome} },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'verification', component: VerifyEmailComponent, canActivate:[AuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard], data:{ authGuardPipe: redirectLoggedInToHome} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
