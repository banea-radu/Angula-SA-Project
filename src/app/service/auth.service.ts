import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DbAuthUser } from '../types/db-auth-user';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public router: Router,
    public angularFireAuth: AngularFireAuth,
    public angularFireStore: AngularFirestore,
    private databaseService: DatabaseService,
    private translate: TranslateService
  ) {
    // Save user data in localstorage when logged in, set null when logged out
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['my-account']);
          }
        });
      })
      .catch((error) => {
        this.translate.get('Login.Form.Submit-Alert-Warning')
          .subscribe((res: string) => {
            alert(res);
        })
      });
  }

  // Sign up with email/password
  SignUp(name: string, email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // save name, email and register date in database
        this.databaseService.postData("users", {name: name, email: email, dateSubmitted: new Date()}).subscribe((response) => {
          console.log("saved to database");
        })
        // Call the SendVerificaitonMail() function when new user sign up and returns promise
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.translate.get('Register.Form.Submit-Alert-Warning')
          .subscribe((res: string) => {
            alert(res);
        })
      });
  }

  // Send email verfication when new user sign up
  SendVerificationMail() {
    return this.angularFireAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.angularFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.translate.get('Reset-Password.Form.Submit-Alert-Success')
          .subscribe((res: string) => {
            alert(res);
        })
      })
      .catch((error) => {
        this.translate.get('Reset-Password.Form.Submit-Alert-Warning')
          .subscribe((res: string) => {
            alert(res);
        })
      });
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['my-account']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );
    const userData: DbAuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}