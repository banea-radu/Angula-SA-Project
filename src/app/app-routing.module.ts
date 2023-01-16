import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './component/home-page/home-page.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { LoginComponent } from './component/my-account/login/login.component';
import { RegisterComponent } from './component/my-account/register/register.component';
import { ForgotPasswordComponent } from './component/my-account/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/my-account/verify-email/verify-email.component';

import { MyAccountGuardService } from './service/my-account-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent} ,
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'my-account', component: MyAccountComponent, canActivate: [MyAccountGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  // {path: '**', component: PageNotFoundComponent},  // Page not found route for a 404 page
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true})], // {useHash: true} is used for the netlify hosting to work
  exports: [RouterModule]
})
export class AppRoutingModule { }
