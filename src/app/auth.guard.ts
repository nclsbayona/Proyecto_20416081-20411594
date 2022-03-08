import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieManagementService } from './services/cookies/cookie-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let ret:boolean=false;
    ret=CookieManagementService.getCookie("username")!.length>0?true:false;
    if (!ret)
      this.router.navigate(['/sign-in']);
    return ret;
  }
}
