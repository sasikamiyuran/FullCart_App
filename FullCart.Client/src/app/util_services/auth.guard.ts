import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRoleEnum } from '../Enum/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._authService.isAuthenticated()){
      const userRole = this._authService.getUserRoles();
      if(userRole == UserRoleEnum.ADMIN){
        return true;
      } else if (userRole == UserRoleEnum.CUSTOMER){
        return true;
      }
      this._router.navigate(['/unauthorized'])
      return false;
    }
    return false;
  }
  
}
