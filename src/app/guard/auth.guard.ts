// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   UrlTree,
// } from '@angular/router';
// import { LoginService } from '../services/login.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   constructor(public loginService: LoginService, public router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
//     if (this.loginService.isLoggedIn !== true) {
//       // Simpan URL yang ingin dituju setelah login
//       const redirectUrl = state.url;
  
//       // Navigasi ke halaman login dengan menyertakan redirect
//       this.router.navigate(['/login'], { queryParams: { redirectUrl } });
//     }
//     return true;
//   }
// }  

// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Cek apakah user memiliki token (sudah login)
    if (this.loginService.isLoggedIn()) {
      // Cek apakah token masih valid dan dapatkan informasi user
      const userInfo = this.loginService.getUserInfo();

      // Cek apakah informasi user ditemukan (token valid)
      if (userInfo) {
        // Jika user valid, izinkan akses
        return true;
      } else {
        // Jika token tidak valid, redirect ke halaman login
        return this.router.createUrlTree(['/login']);
      }
    } else {
      // Jika user belum login, redirect ke halaman login
      return this.router.createUrlTree(['/login']);
    }
  }
}

