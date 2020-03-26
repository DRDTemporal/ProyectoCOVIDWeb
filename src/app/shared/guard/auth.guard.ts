import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar,
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['']);
      this.snackBar.open('Usted no puede ingresar a esa ruta.', 'Error', {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    }
    return true;
  }
}
