import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAuth: any;
  constructor(
    public angFireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private snackBar: MatSnackBar,
  ) {
    this.getAuthState();
  }

  getAuthState() {
    this.angFireAuth.authState.subscribe(user => {
      if (user) {
        this.userAuth = user;
        localStorage.setItem('user', JSON.stringify(this.userAuth));
      } else {
        localStorage.removeItem('user');
      }

    });
  }

  getAuthStateSignIn() {
    this.angFireAuth.authState.subscribe(user => {
      if (user) {
        this.userAuth = user;
        localStorage.setItem('user', JSON.stringify(this.userAuth));
      } else {
        localStorage.removeItem('user');
      }
      this.router.navigate(['']);

    });
  }

  async SignIn(email: string, password: string) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      this.getAuthStateSignIn();
      this.ngZone.run(() => {
        this.snackBar.open('Inicio de sesión correcto.', 'Bienvenido', {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      });
    } catch (e) {
      this.snackBar.open('Por favor revise que su correo electrónico y su contraseña esten bien escritos.', 'Algo anda mal :(', {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
     }
  }


  async SendVerificationMail() {
    await auth().currentUser.sendEmailVerification();
    localStorage.removeItem('user');
    // this.router.navigate(['']);
  }

   // Sign out
   async SignOut() {
    await auth().signOut();
    await delay(100);
    this.snackBar.open('Se ha cerrado sesión correctamente.', 'Adiós.', {
       duration: 2000,
       panelClass: ['blue-snackbar']
     });
    this.router.navigate(['iniciar-sesion']);

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

}
