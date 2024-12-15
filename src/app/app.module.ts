import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { ButtonComponent } from './component/shared/button/button.component';
import { HomeCardsComponent } from './component/shared/home-cards/home-cards.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { AboutCardsComponent } from './component/shared/about-cards/about-cards.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { LoginComponent } from './component/my-account/login/login.component';
import { RegisterComponent } from './component/my-account/register/register.component';
import { ForgotPasswordComponent } from './component/my-account/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/my-account/verify-email/verify-email.component';
import { UsersComponent } from './component/users/users.component';
import { ProgramsComponent } from './component/programs/programs.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { NewsletterComponent } from './component/newsletter/newsletter.component';
import { MyProfileComponent } from './component/my-account/my-profile/my-profile.component';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SubscriptionsComponent } from './component/subscriptions/subscriptions.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http); // default location for [lang] files is "/assets/i18n/[lang].json"
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    HomeCardsComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    AboutCardsComponent,
    MyAccountComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UsersComponent,
    ProgramsComponent,
    ContactsComponent,
    NewsletterComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
