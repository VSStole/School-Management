import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import{AppRoutingModule, } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
 import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    SignupComponent,
   
  
      
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    AppRoutingModule,
     SharedModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
