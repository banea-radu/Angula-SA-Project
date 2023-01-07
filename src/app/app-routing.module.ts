import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { LoginComponent } from './component/login/login.component';
import { MyaccountComponent } from './component/myaccount/myaccount.component';
import { MyaccountGuardService } from './service/myaccount-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'myaccount', redirectTo: 'login'},
  {path: 'myaccount', component: MyaccountComponent, canActivate: [MyaccountGuardService]}
  // {path: '**', component: PageNotFoundComponent},  // Page not found route for a 404 page
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true})], // {useHash: true} is used for the netlify hosting to work
  exports: [RouterModule]
})
export class AppRoutingModule { }
