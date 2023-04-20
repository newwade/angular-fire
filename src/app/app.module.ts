import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule,  } from '@angular/platform-browser/animations';
import { NgCalendarModule  } from 'ionic2-calendar';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    VerifyEmailComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    NgCalendarModule
    
  ],
  providers: [NgCalendarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
