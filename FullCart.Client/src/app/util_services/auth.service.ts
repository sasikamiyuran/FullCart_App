import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., token is not expired)
    // Implement this method based on your authentication mechanism
    // For example, using a token stored in localStorage
    const token = localStorage.getItem('token');
    return !this._jwtHelper.isTokenExpired(token);
  }

  getUserRoles(): string {
    // Implement this method to retrieve user roles from the token
    // This will depend on how you structure your JWT tokens
    const token = localStorage.getItem('token');
    // Parse the token and extract roles
    // For example, if roles are stored in the 'roles' claim
    if(token != null || token != undefined){
      const decodedToken = this._jwtHelper.decodeToken(token);
      console.log(decodedToken);
      
      return decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : [];
    }
    return '';
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logOut(): boolean{
    localStorage.removeItem('token');
    return true;
  }
}
